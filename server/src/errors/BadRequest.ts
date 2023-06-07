export class BadRequest extends Error {
	constructor(message?: string) {
		super();
		this.name = "BadRequest";
		this.message = message || "";
	}
}
