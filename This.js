//if arrow function then value of this inside function is equal to value of this outside person.
/*console.log(this);
const printThis = () =>
{
    console.log(this);
};

printThis();

//case 2..this return an object
const colors = {
    printColor() {
        console.log(this);

        const printThis = () => {
            console.log(this);
        };
        printThis();
    }
}
colors.printColor();


//case 3..print will equal to color of blue with call,bind and apply
const printThis2 = function() {
    console.log(this);
}
printThis = function()
{
    console.log(this);
}
//printThis2.call({color: 'blue'});
*/

//case 3..this refer to colors object/whatever will be as left.
const colors = {
    printColor() {
        console.log(this);
    }
};
colors.printColor();