import { AlertTriangle, CheckCircle, RefreshCw, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import type { Account } from "../api";
import { api } from "../api";
import { APIErrorBoundary } from "./ErrorBoundary";
import { Button } from "./ui/button";

interface OAuthTokenStatusProps {
	accountName: string;
	hasRefreshToken: boolean;
	provider?: string; // Optional for backward compatibility
	account?: Account; // Full account object for reauth
	onReauthSuccess?: () => void;
}

type TokenStatus =
	| "healthy"
	| "warning"
	| "critical"
	| "expired"
	| "no-refresh-token"
	| "loading"
	| "error";

type ReauthStep =
	| "idle"
	| "fetching"
	| "waiting"
	| "completing"
	| "done"
	| "error";

export function OAuthTokenStatus({
	accountName,
	hasRefreshToken,
	account,
	onReauthSuccess,
}: Omit<OAuthTokenStatusProps, "provider">) {
	const [status, setStatus] = useState<TokenStatus>("loading");
	const [message, setMessage] = useState("Loading...");
	const [fallbackAttempted, setFallbackAttempted] = useState(false);
	const [reauthStep, setReauthStep] = useState<ReauthStep>("idle");
	const [reauthAuthUrl, setReauthAuthUrl] = useState<string | null>(null);
	const [reauthSessionId, setReauthSessionId] = useState<string | null>(null);
	const [reauthCode, setReauthCode] = useState("");
	const [reauthError, setReauthError] = useState<string | null>(null);

	useEffect(() => {
		if (!hasRefreshToken) {
			// Immediately set status for non-OAuth accounts
			setStatus("no-refresh-token");
			setMessage("This account type doesn't support token health monitoring");
			return;
		}

		// Add cancellation only - no artificial delay for better UX
		let cancelled = false;

		const fetchTokenStatus = async () => {
			if (cancelled) return;

			try {
				const response = await api.getAccountTokenHealth(accountName);
				if (cancelled) return;

				if (response?.success) {
					setStatus(response.data.status);
					setMessage(response.data.message);
				} else {
					console.error("API returned error:", response);
					setStatus("error");
					setMessage("Failed to load token status");
				}
			} catch (error) {
				if (cancelled) return;
				console.error("Failed to fetch token status:", error);
				setStatus("error");
				setMessage("Failed to check token status");
			}
		};

		// Execute immediately without delay
		fetchTokenStatus();

		return () => {
			cancelled = true;
		};
	}, [accountName, hasRefreshToken]);

	// Fallback: if initial fetch fails, try global token health
	useEffect(() => {
		if (status === "error" && hasRefreshToken && !fallbackAttempted) {
			setFallbackAttempted(true);
			let cancelled = false;

			const checkGlobalHealth = async () => {
				try {
					const globalResponse = await api.getTokenHealth();
					if (cancelled) return;

					if (globalResponse?.success && globalResponse.data?.accounts) {
						const accountData = globalResponse.data.accounts.find(
							(acc: {
								accountName: string;
								status: TokenStatus;
								message: string;
							}) => acc.accountName === accountName,
						);
						if (accountData) {
							setStatus(accountData.status);
							setMessage(accountData.message);
						}
					}
				} catch (error) {
					if (cancelled) return;
					console.error("Failed to fetch global health:", error);
				}
			};

			checkGlobalHealth();

			return () => {
				cancelled = true;
			};
		}
	}, [status, accountName, hasRefreshToken, fallbackAttempted]);

	// Don't show anything for non-OAuth accounts
	if (!hasRefreshToken) {
		return null;
	}

	// Show loading during fallback attempt
	if (status === "error") {
		return (
			<span
				className="inline-flex items-center ml-2"
				title="OAuth refresh token status unknown - checking..."
			>
				<RefreshCw className="h-4 w-4 text-gray-400 animate-spin" />
			</span>
		);
	}

	const getIcon = () => {
		switch (status) {
			case "healthy":
				return <CheckCircle className="h-4 w-4 text-green-600" />;
			case "warning":
				return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
			case "critical":
			case "expired":
				return <XCircle className="h-4 w-4 text-red-600" />;
			case "loading":
				return <RefreshCw className="h-4 w-4 text-gray-400 animate-spin" />;
			default:
				return <AlertTriangle className="h-4 w-4 text-gray-500" />;
		}
	};

	const getTooltip = () => {
		switch (status) {
			case "healthy":
				return "OAuth token available";
			case "warning":
				return `OAuth token expiring soon - ${message}`;
			case "critical":
			case "expired":
				return `OAuth token expired - ${message}`;
			case "loading":
				return "Checking OAuth token status...";
			default:
				return "OAuth token status unknown";
		}
	};

	const handleReauthStart = async () => {
		if (!account) return;
		setReauthStep("fetching");
		setReauthError(null);
		try {
			const result = await api.reauthInitAccount(account.id);
			setReauthAuthUrl(result.authUrl);
			setReauthSessionId(result.sessionId);
			setReauthStep("waiting");
			window.open(result.authUrl, "_blank");
		} catch (err) {
			setReauthError(
				err instanceof Error
					? err.message
					: "Failed to start re-authentication",
			);
			setReauthStep("error");
		}
	};

	const handleReauthComplete = async () => {
		if (!account || !reauthSessionId || !reauthCode.trim()) return;
		setReauthStep("completing");
		setReauthError(null);
		try {
			await api.reauthCompleteAccount(account.id, {
				sessionId: reauthSessionId,
				code: reauthCode.trim(),
			});
			setReauthStep("done");
			setStatus("healthy");
			setMessage("Token refreshed successfully");
			onReauthSuccess?.();
		} catch (err) {
			setReauthError(
				err instanceof Error
					? err.message
					: "Failed to complete re-authentication",
			);
			setReauthStep("error");
		}
	};

	const handleReauthCancel = () => {
		setReauthStep("idle");
		setReauthAuthUrl(null);
		setReauthSessionId(null);
		setReauthCode("");
		setReauthError(null);
	};

	const isExpiredOrCritical = status === "expired" || status === "critical";

	return (
		<>
			<span className="inline-flex items-center ml-2" title={getTooltip()}>
				{getIcon()}
			</span>
			{isExpiredOrCritical && account && reauthStep === "idle" && (
				<Button
					variant="outline"
					size="sm"
					className="h-6 px-2 text-xs ml-1 text-red-600 border-red-300 hover:bg-red-50"
					onClick={handleReauthStart}
				>
					Re-authenticate
				</Button>
			)}
			{isExpiredOrCritical && account && reauthStep !== "idle" && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
					<div className="bg-background border rounded-lg p-6 w-full max-w-md shadow-xl space-y-4">
						<h3 className="font-semibold text-lg">
							Re-authenticate: {accountName}
						</h3>

						{reauthStep === "fetching" && (
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<RefreshCw className="h-4 w-4 animate-spin" />
								Starting authentication flow...
							</div>
						)}

						{(reauthStep === "waiting" || reauthStep === "completing") && (
							<div className="space-y-3">
								<p className="text-sm text-muted-foreground">
									A browser window has opened for authentication. After
									completing it, paste the authorization code below.
								</p>
								{reauthAuthUrl && (
									<p className="text-xs">
										<a
											href={reauthAuthUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="text-primary underline break-all"
										>
											Open authentication page
										</a>
									</p>
								)}
								<div className="space-y-1">
									<label htmlFor="reauth-code" className="text-sm font-medium">
										Authorization Code
									</label>
									<input
										id="reauth-code"
										type="text"
										className="w-full border rounded px-3 py-2 text-sm bg-background"
										placeholder="Paste code here..."
										value={reauthCode}
										onChange={(e) => setReauthCode(e.target.value)}
										disabled={reauthStep === "completing"}
									/>
								</div>
							</div>
						)}

						{reauthStep === "done" && (
							<p className="text-sm text-green-600">
								Re-authentication successful! Token has been updated.
							</p>
						)}

						{reauthStep === "error" && (
							<p className="text-sm text-destructive">{reauthError}</p>
						)}

						<div className="flex justify-end gap-2">
							{reauthStep !== "done" && (
								<Button variant="ghost" size="sm" onClick={handleReauthCancel}>
									Cancel
								</Button>
							)}
							{reauthStep === "waiting" && (
								<Button
									size="sm"
									onClick={handleReauthComplete}
									disabled={!reauthCode.trim()}
								>
									Complete
								</Button>
							)}
							{reauthStep === "error" && (
								<Button size="sm" onClick={handleReauthStart}>
									Retry
								</Button>
							)}
							{reauthStep === "done" && (
								<Button size="sm" onClick={handleReauthCancel}>
									Close
								</Button>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
}

/**
 * Wrapped OAuthTokenStatus with error boundary protection
 */
export function OAuthTokenStatusWithBoundary(props: OAuthTokenStatusProps) {
	return (
		<APIErrorBoundary>
			<OAuthTokenStatus
				accountName={props.accountName}
				hasRefreshToken={props.hasRefreshToken}
				account={props.account}
				onReauthSuccess={props.onReauthSuccess}
			/>
		</APIErrorBoundary>
	);
}
