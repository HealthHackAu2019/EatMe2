import _ from 'lodash'

const maptmp = [{loc: 'bread.svg', name: 'Bread'},
    {loc: 'dessert.svg', name: 'Dessert'},
    {loc: 'fresh-fruit.svg', name: 'FreshFruit'},
    {loc: 'green-veg.svg', name: 'GreenVeg'},
    {loc: 'hot-main.svg', name: 'HotMain'},
    {loc: 'juice.svg', name: 'Juice'},
    {loc: 'milk.svg', name: 'MilkDrink'},
    {loc: 'orange-veg.svg', name: 'OrangeVeg'},
    {loc: 'pc-fruit.svg', name: 'Other'},
    {loc: 'salad-bowl.svg', name: 'SaladBowl'},
    {loc: 'sandwich.svg', name: 'Sandwich'},
    {loc: 'broth.svg', name: 'Soup'},
    {loc: 'starch.svg', name: 'Starch'}]

const map = _.reduce(maptmp, (obj,e)=>{
    obj[e.name] = e.loc
    return obj
}, {})

export default map 