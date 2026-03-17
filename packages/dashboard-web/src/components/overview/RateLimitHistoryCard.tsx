import { History } from "lucide-react";
import { useRecentRateLimitEvents } from "../../hooks/queries";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";

function formatDate(ms: number): string {
	return new Date(ms).toLocaleString(undefined, {
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});
}

function formatResetAt(ms: number | null): string {
	if (ms === null) return "—";
	return new Date(ms).toLocaleString(undefined, {
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});
}

export function RateLimitHistoryCard() {
	const { data, isLoading } = useRecentRateLimitEvents(50);
	const events = data?.events ?? [];

	if (!isLoading && events.length === 0) {
		return null;
	}

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-2">
					<History className="h-4 w-4 text-muted-foreground" />
					<CardTitle>Rate Limit History</CardTitle>
				</div>
				<CardDescription>
					최근 rate limit 발생 이력 (전체 계정, 최대 50건)
				</CardDescription>
			</CardHeader>
			<CardContent>
				{isLoading ? (
					<p className="text-sm text-muted-foreground text-center py-4">
						Loading...
					</p>
				) : (
					<div className="overflow-x-auto">
						<table className="w-full text-sm">
							<thead>
								<tr className="border-b text-left text-muted-foreground">
									<th className="pb-2 pr-4 font-medium">계정</th>
									<th className="pb-2 pr-4 font-medium">Provider</th>
									<th className="pb-2 pr-4 font-medium">발생 시각</th>
									<th className="pb-2 pr-4 font-medium">해제 예정</th>
									<th className="pb-2 font-medium">잔여 요청</th>
								</tr>
							</thead>
							<tbody>
								{events.map((event) => (
									<tr
										key={event.id}
										className="border-b last:border-0 hover:bg-muted/20"
									>
										<td className="py-2 pr-4 font-medium">
											{event.accountName}
										</td>
										<td className="py-2 pr-4 text-muted-foreground text-xs">
											{event.provider}
										</td>
										<td className="py-2 pr-4 tabular-nums text-xs">
											{formatDate(event.occurredAt)}
										</td>
										<td className="py-2 pr-4 tabular-nums text-xs">
											{formatResetAt(event.resetAt)}
										</td>
										<td className="py-2 tabular-nums text-xs">
											{event.remaining !== null ? event.remaining : "—"}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
