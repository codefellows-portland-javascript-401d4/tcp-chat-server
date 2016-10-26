const nameGenerator = {};

const namesString = 'Bacon ipsum dolor amet jerky hamburger capicola drumstick ham alcatra kevin ball tip tri-tip filet mignon boudin beef Tenderloin porchetta short loin brisket pancetta burgdoggen kielbasa landjaeger capicola corned beef pork loin rump ham Beef ribs burgdoggen cupim shank pastrami boudin andouille Drumstick picanha porchetta pancetta ball tip pastrami jerky venison prosciutto ribeye sirloin';

nameGenerator.namesArray = namesString.split(' ');

nameGenerator.randomNameSelector = function() {
  var index = Math.floor(Math.random() * nameGenerator.namesArray.length);
  return nameGenerator.namesArray[index];
};

module.exports = nameGenerator;
