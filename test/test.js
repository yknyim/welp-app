// const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised).should();

const User = require('../models/user');
const Restaurant = require('../models/restaurants');

// add a "describe block" for restaurant tests
describe('Restaurant model', () => {
    it('should be able to grab an array of restaurants', async () => {
        // Write the code you wish existed
        const arrayOfRestaurants = await Restaurant.getAll();
        expect(arrayOfRestaurants).to.be.instanceOf(Array);
    });
});
// describe('Sanity check', function () {
//     it('should be 2', function () {
//         // assert.equal(2, 1 + 1);
//         expect(1 + 1).to.equal(2);
//     });
// });

describe('Users model', () => {
    // const poop = '💩';
    // 😃
    it('should be able to retreive by id', async () => {
        const theUser = await User.getById(3);
        theUser.should.be.an.instanceOf(User);
    //    theUser.should.have.length(1);
    });

    // 😢
    it('should error if no user by id', async () => {
        const theUser = await User.getById(276345);
        expect(theUser).to.be.null;
        // theUser.should.be.an.instanceOf(User);
    //    theUser.should.have.length(1);
    });

    // As long as there is no exception thrown in an it block,
    // that counts as a passing test.
    // it('should solve global warming', async () => {});
    // it('should cure cancer', async () => {});
    // it('should make me rich', async () => {});

    it('should update the user', async () => {
        // grab a user with id 2
        const theUser = await User.getById(2);

        // update the email
        theUser.email = 'new@new.com';
        // save the user
        await theUser.save();

        // re-grab the user with id 2
        const alsoTheUser = await User.getById(2);
        // // expect the email to be equal to the new value
        expect(theUser.email).to.equal('new@new.com');


        // theUser.save()
        //     .then(async (report) => {
        //         // console.log(report);
        //         // re-grab the user with id 2
        //         const alsoTheUser = await User.getById(2);
        //         // expect the email to be equal to the new value
        //         expect(alsoTheUser.email).to.equal('neashfakfaksgfaksjgfajsgfajsgfsjafgasjfgsajfgsjagdfsaw@new.com');
        //     });
    });


    it('should not have the same email after updating it', async () => {
        // grab a user with id 2
        const theUser = await User.getById(2);
        // grab the current value for the email field
        const theOldEmail = theUser.email;

        // update the email to a new value
        // using the unix timestamp as part of the address
        const theNewEmail = `new${new Date().getTime()}@email.com`;
        theUser.email = theNewEmail;

        // save the user to the database
        await theUser.save();

        // re-grab the user with id 2
        const alsoTheUser = await User.getById(2);

        // expect the email not to be equal to the new value;
        expect(alsoTheUser.email).not.be.to.equal(theOldEmail);
        expect(alsoTheUser.email).to.equal(theNewEmail);


        // theUser.save()
        //     .then(async (report) => {
        //         // console.log(report);
        //         // re-grab the user with id 2
        //         const alsoTheUser = await User.getById(2);
        //         // expect the email to be equal to the new value
        //         expect(alsoTheUser.email).to.equal('new3asdfadf@new.com');
        //     });
    });    
});

