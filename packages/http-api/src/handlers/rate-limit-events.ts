import type { DatabaseOperations } from "@better-ccflare/database";
import { jsonResponse } from "@better-ccflare/http-common";

/**
 * GET /api/rate-limit-events?account_id=xxx&limit=50
 */
export function createRateLimitEventsHandler(dbOps: DatabaseOperations) {
	return async (url: URL): Promise<Response> => {
		const accountId = url.searchParams.get("account_id");
		const limitParam = parseInt(url.searchParams.get("limit") ?? "50", 10);
		const limit =
			Number.isFinite(limitParam) && limitParam > 0
				? Math.min(limitParam, 200)
				: 50;

		const repo = dbOps.getRateLimitEventRepository();
		const events = accountId
			? await repo.getByAccount(accountId, limit)
			: await repo.getRecent(limit);

		return jsonResponse({ events });
	};
}
