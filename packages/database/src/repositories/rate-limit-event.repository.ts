import { randomUUID } from "node:crypto";
import { BaseRepository } from "./base.repository";

export interface RateLimitEvent {
	id: string;
	accountId: string;
	accountName: string;
	occurredAt: number;
	resetAt: number | null;
	remaining: number | null;
	provider: string;
}

interface RateLimitEventRow {
	id: string;
	account_id: string;
	account_name: string;
	occurred_at: number;
	reset_at: number | null;
	remaining: number | null;
	provider: string;
}

function toRateLimitEvent(row: RateLimitEventRow): RateLimitEvent {
	return {
		id: row.id,
		accountId: row.account_id,
		accountName: row.account_name,
		occurredAt: row.occurred_at,
		resetAt: row.reset_at,
		remaining: row.remaining,
		provider: row.provider,
	};
}

export class RateLimitEventRepository extends BaseRepository<RateLimitEvent> {
	async record(event: {
		accountId: string;
		accountName: string;
		occurredAt: number;
		resetAt: number | null;
		remaining: number | null;
		provider: string;
	}): Promise<void> {
		await this.run(
			`INSERT INTO rate_limit_events (id, account_id, account_name, occurred_at, reset_at, remaining, provider)
			 VALUES (?, ?, ?, ?, ?, ?, ?)`,
			[
				randomUUID(),
				event.accountId,
				event.accountName,
				event.occurredAt,
				event.resetAt,
				event.remaining,
				event.provider,
			],
		);
	}

	async getByAccount(accountId: string, limit = 50): Promise<RateLimitEvent[]> {
		const rows = await this.query<RateLimitEventRow>(
			`SELECT id, account_id, account_name, occurred_at, reset_at, remaining, provider
			 FROM rate_limit_events
			 WHERE account_id = ?
			 ORDER BY occurred_at DESC
			 LIMIT ?`,
			[accountId, limit],
		);
		return rows.map(toRateLimitEvent);
	}

	async getRecent(limit = 100): Promise<RateLimitEvent[]> {
		const rows = await this.query<RateLimitEventRow>(
			`SELECT id, account_id, account_name, occurred_at, reset_at, remaining, provider
			 FROM rate_limit_events
			 ORDER BY occurred_at DESC
			 LIMIT ?`,
			[limit],
		);
		return rows.map(toRateLimitEvent);
	}

	async deleteOlderThan(cutoffMs: number): Promise<number> {
		return this.runWithChanges(
			`DELETE FROM rate_limit_events WHERE occurred_at < ?`,
			[cutoffMs],
		);
	}
}
