import { faker } from "@faker-js/faker";

const posts = Array.from({ length: 10 }, (_, i) => {
	return {
		id: i,
		name: faker.person.fullName(),
		userAt: faker.internet.displayName().toLocaleLowerCase(),
		timestamp: faker.date.anytime().toISOString(),
		content: faker.commerce.productDescription(),
		likes: faker.number.int({ min: 0, max: 500 }),
		comments: faker.number.int({ min: 0, max: 500 }),
	};
});

console.log(posts);
export default posts;
