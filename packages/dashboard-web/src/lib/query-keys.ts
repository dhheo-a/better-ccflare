export const queryKeys = {
	all: ["better-ccflare"] as const,
	accounts: () => [...queryKeys.all, "accounts"] as const,
	agents: () => [...queryKeys.all, "agents"] as const,
	stats: () => [...queryKeys.all, "stats"] as const,
	analytics: (
		timeRange?: string,
		filters?: unknown,
		viewMode?: string,
		modelBreakdown?: boolean,
		customDateRange?: { startMs: number; endMs: number },
		accountBreakdown?: boolean,
	) =>
		[
			...queryKeys.all,
			"analytics",
			{
				timeRange,
				filters,
				viewMode,
				modelBreakdown,
				customDateRange,
				accountBreakdown,
			},
		] as const,
	requests: (limit?: number) =>
		[...queryKeys.all, "requests", { limit }] as const,
	logs: () => [...queryKeys.all, "logs"] as const,
	logHistory: () => [...queryKeys.all, "logs", "history"] as const,
	defaultAgentModel: () =>
		[...queryKeys.all, "config", "defaultAgentModel"] as const,
	clientIpAliases: () => [...queryKeys.all, "client-ip-aliases"] as const,
	rateLimitEvents: (accountId: string) =>
		[...queryKeys.all, "rate-limit-events", accountId] as const,
} as const;
