/* eslint-disable no-unused-vars */
"use strict";

const {
  db,
  models: { User, Tag, Question, UserAnswered, Streak },
} = require("../server/db");

const csvParser = require("./csv");

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  const { user_seed_data } = require("./seed_data");

  const myDB = {
    users: (() =>
      user_seed_data.map((user) => {
        const { f, l, r, a } = user;
        return {
          firstName: f,
          lastName: l,
          email: `${f + l}@factorfiction.com`,
          password: "12345678",
          role: r,
          affiliation: a,
        };
      }))(),
  };
  const { users } = myDB;

  const allUsers = await User.bulkCreate(users, {
    returning: true,
  });

  const { rawQuestions, rawTags } = await csvParser();

  const tags = [...rawTags].map((tag) => ({ name: tag }));
  // console.log(tags);
  // console.log([...rawTags]);
  const questions = Object.values(rawQuestions).map((question) => {
    const { text, answer, explanation, expiration, source, tags } = question;
    return { text, answer, explanation, source, status: "Approved" };
  });

  const questionTags = Object.values(rawQuestions).reduce(
    (tagsObj, question) => {
      const { text, tags } = question;
      tagsObj[text] = tags;
      return tagsObj;
    },
    {}
  );
  // console.log(questionTags);

  const allTags = await Tag.bulkCreate(tags, {
    returning: true,
  });

  const allQuestions = await Question.bulkCreate(questions, {
    returning: true,
  });
  allQuestions.forEach((question) => {
    const { text } = question;
    const tags = questionTags[text];
    tags.forEach((tagName) => {
      const foundTag = allTags.find((tag) => {
        return tag.name === tagName;
      });
      // console.log(foundTag && foundTag.id, `T ${tagName} T`);
      if (foundTag) {
        question.addTag(foundTag.id);
      }
    });
    // console.log(tags);
  });
  const [admin, user] = allUsers;
  const [one, two, three, four] = allQuestions;
  const [tag1, tag2, tag3, tag4] = allTags;
  await user.addQuestion(two);

  const answered = await UserAnswered.create({
    answeredCorrectly: true,
    userId: user.id,
    questionId: one.id,
  });
  const streak = await Streak.create({ score: 900, userId: user.id });
  streak.addUseranswered(answered);
  // console.log(Object.keys(user.__proto__));
  await one.addTag([tag1, tag2]);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
