export class ConflictError extends Error {
	constructor(message?: string) {
		super();
		this.name = "ConflictError";
		this.message = message || "";
	}
}
