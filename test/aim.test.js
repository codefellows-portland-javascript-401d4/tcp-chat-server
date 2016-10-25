const assert = require('chai').assert;
const strippedDownAIM = require('../aim');

describe('AIM-like chat', () => {
    const aim = new strippedDownAIM();

    class fakeUserObj {
        write(message) {
            this.received = message;
        }
    }

    const fakeUser = new fakeUserObj();
    const fakeUserToo = new fakeUserObj();

    it('adds users properly', () => {
        assert.equal(aim.users.length, 0);
        aim.add(fakeUser);
        assert.equal(aim.users.length, 1);
        // assert.equal(aim.users[0], fakeUser);
        // assert.equal(fakeUser.name, 'fakeUser');
        // aim.add(fakeUser);
        // assert(fakeUser.name, 'fakeUser1');
    });

    
});