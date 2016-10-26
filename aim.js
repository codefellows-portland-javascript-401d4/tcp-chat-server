module.exports = class AIM {
    
    constructor() {
        this.users = [];
    }

    add(user) {
        let nameList = ['garfield', 'james', 'kilroy', 'ivan', 'chesterfield', 'nero'];
        
        function randomNum(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function findNames(array) {
            for (let i = 0; i < array.length; i++) {
                if (array[i].name === userName) {
                    return array[i].name;
                }
            }
        }

        function determineNameNumber(array, username) {
            let count = 0;
            for(let i = 0; i < array.length; i++) {
                let nameRegex = new RegExp(username);
                let nameMatch = nameRegex.test(array[i].name);
                if (nameMatch) {
                    count++;
                }
            }
            return count;
        }

        let userNum = randomNum(0, nameList.length - 1);
        let userName = nameList[userNum];
        let arrivingUser = userName;
        
        if (!findNames(this.users)) {
            user.name = userName;
            this.users.push(user);
        } else if (findNames(this.users)) {
            let numAtEnd = determineNameNumber(this.users, userName);
            user.name = `${userName}${numAtEnd}`;
            this.users.push(user);
        }
        user.write(`Welcome, ${user.name}.`);
        this.users.forEach((user) => {
            if(user.name !== userName)
                user.write(`${userName} has logged on.`);
        });
        console.log(`User ${user.name} has connected.`);
    }

    send(sender, message) {
        this.users.forEach(user => {
            if(user === sender) return;
            user.write(`${sender.name} says ${message}`);
        });
    }

    remove(user) {
        const userIndex = this.users.indexOf(user);
        let leavingUser = user.name;
        if (userIndex !== -1) this.users.splice(userIndex, 1);
        this.users.forEach((user) => {
            if(user) user.write(`${leavingUser} has logged off.`);
        });
        console.log(`User ${user.name} has disconnected.`);
    }
};