import type { Account } from "../../api";
import { useRateLimitEvents } from "../../hooks/queries";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";

interface RateLimitHistoryDialogProps {
	account: Account | null;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

function formatDate(ms: number | null): string {
	if (ms === null) return "—";
	return new Date(ms).toLocaleString();
}

export function RateLimitHistoryDialog({
	account,
	isOpen,
	onOpenChange,
}: RateLimitHistoryDialogProps) {
	const { data, isLoading } = useRateLimitEvents(account?.id ?? "");

	const events = data?.events ?? [];

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Rate Limit History</DialogTitle>
					<DialogDescription>
						{account?.name
							? `Recent rate limit events for account "${account.name}"`
							: "Rate limit event history"}
					</DialogDescription>
				</DialogHeader>

				{isLoading ? (
					<p className="text-sm text-muted-foreground py-4 text-center">
						Loading...
					</p>
				) : events.length === 0 ? (
					<p className="text-sm text-muted-foreground py-4 text-center">
						No rate limit events recorded.
					</p>
				) : (
					<div className="overflow-x-auto">
						<table className="w-full text-sm">
							<thead>
								<tr className="border-b text-left text-muted-foreground">
									<th className="pb-2 pr-4 font-medium">Occurred At</th>
									<th className="pb-2 pr-4 font-medium">Reset At</th>
									<th className="pb-2 font-medium">Remaining</th>
								</tr>
							</thead>
							<tbody>
								{events.map((event) => (
									<tr key={event.id} className="border-b last:border-0">
										<td className="py-2 pr-4 tabular-nums">
											{formatDate(event.occurredAt)}
										</td>
										<td className="py-2 pr-4 tabular-nums">
											{formatDate(event.resetAt)}
										</td>
										<td className="py-2">
											{event.remaining !== null ? event.remaining : "—"}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}
