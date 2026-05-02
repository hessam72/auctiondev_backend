
const { has, get, map, find } = require('lodash');
const all = (list, getItem=null) => {
  return map(list, data => {
    const item = getItem? get(data,getItem): data;
    return oneOf(item);
  });
}
const oneOf = (data, getItem=null) => {
    const item = getItem? get(data,getItem): data;
    return {
      _id: item._id,
      location: location(item.location),
      title: item.title,
      period: item.period,
      description: item.description,
      publishAt: item.publishAt,
      tags: item.tags,
      amount: item.amount,
      category: {
        _id: item.category._id,
        title: item.category.title,
        icon: "http://api.mozamona.com/"+item.category.icon,
      },
      files: item.files.filter(file=>file.free).map(file=>"http://api.mozamona.com/"+file.path),
      show: false,
      plans: false,
    };
}

const location= (city)=>{
  if(city && city.parentId){
    return `${city.parentId.title} ${city.title} `;
  }
}

const free = ({product,show,favorite}) => {
  // return {product,show,favorite}
  const item = product;
  return {
    _id: item._id,
    location: location(item.location),
    like: !!favorite,
    title: item.title,
    period: item.period,
    description: item.description,
    publishAt: item.publishAt,
    tags: item.tags,
    amount: item.amount,
    category: {
      _id: item.category._id,
      title: item.category.title,
      icon: "http://api.mozamona.com/"+item.category.icon,
    },
    files: item.files.filter(file=>file.free).map(file=> "http://api.mozamona.com/"+file.path),
    show: !!show,
    plans: false,
  };
}

const buy = ({product,plans,show,favorite}) => {
  const item = product;
  return {
    _id: item._id,
    location: location(item.location),
    like: !!favorite,
    title: item.title,
    period: item.period,
    description: item.description,
    publishAt: item.publishAt,
    tags: item.tags,
    amount: item.amount,
    category: {
      _id: item.category._id,
      title: item.category.title,
      icon: "http://api.mozamona.com/"+item.category.icon,
    },
    files: item.files.map(file=> "http://api.mozamona.com/"+file.path),
    show: !!show,
    plans: true
  }
}
module.exports = {
all,
oneOf,
free,
buy,
}
