
// i have 90 tk  in my pocket. now i metch me some caetgory in (1 to 20, 20 to 50, 50 to 100, 100 to 1000, 1001 to 2000)

const myPocket = 90;
const categories = [
  { from: 1, to: 20, price: 10, percent:'no' },
  { from: 20, to: 50, price: 20, percent:'yes' },
  { from: 50, to: 100, price: 30 , percent:'no'},
  { from: 100, to: 1000, price: 40, percent:'yes' },
  { from: 1001, to: 2000, price: 50, percent:'no' },
];

const data =(pocket)=>{
  const vale =  categories.find((category) => pocket >= category.from && pocket <= category.to);
  const data = vale.percent === 'yes' ? pocket + (pocket * vale.price) / 100 : pocket + vale.price;
  return data;
}


console.log(data(120));