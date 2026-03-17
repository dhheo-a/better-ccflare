export interface RateLimitEvent {
	id: string;
	accountId: string;
	accountName: string;
	occurredAt: number;
	resetAt: number | null;
	remaining: number | null;
	provider: string;
}

export interface RateLimitEventsResponse {
	events: RateLimitEvent[];
}
