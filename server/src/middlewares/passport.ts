import passport from "passport";
import { Users } from "@models";
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from "passport-jwt";

const options: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_PRIVATE_KEY,
};

const jwtStrategy = new JwtStrategy(options, (payload, done) => {
	Users.query()
		.findById(payload.id)
		.then((user) => {
			if (!user) return done(null, false);
			return done(null, user);
		})
		.catch((err) => {
			return done(err, false);
		});
});

passport.use(jwtStrategy);

export { passport };
