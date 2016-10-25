const assert = require('chai').assert;
const expect = require('chai').expect;
const strippedDownAIM = require('../aim');

describe('AIM-like chat', () => {
    const aim = new strippedDownAIM();

    class fakeUserObj {
        write(message) {
            this.received = message;
        }
    }

    const fake1 = new fakeUserObj();
    const fake2 = new fakeUserObj();

    it('adds users properly', () => {
        let nameList = ['garfield', 'james', 'kilroy', 'ivan', 'chesterfield', 'nero'];
        let testPerson = fake1;
        assert.equal(aim.users.length, 0);
        aim.add(testPerson);
        assert.equal(aim.users.length, 1);
        expect(nameList).include(testPerson.name);
    });

    it('delivers message to other users', () => {
        aim.add(fake2);
        aim.send(fake2, 'howdy');
        assert.equal(fake1.received, fake2.name + ' says howdy');
        assert.isNotOk(fake2.received);
    });
});