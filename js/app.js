"use strict";

// ajax call
$.ajax('../data/page-1.json').then(main);

// all the functions, run thorugh ajax
function main(fileList) {
  fileList.forEach(makeHornsObjects);
  hornsCatalog.forEach(hornPic => {hornPic.render()});
  addSelectOptions();
  selectFilter();
  $('select').on('click', function() {console.log(this.type)});
}

// Functions for the page
let hornsCatalog = [];

function HornsObject(a,b,c,d,e) {
  this.image_url = a;
  this.title = b;
  this.description = c;
  this.keyword = d;
  this.horns = e;
  this.addToCatalog();
}

HornsObject.prototype.addToCatalog = function() {
  hornsCatalog.push(this);
}

HornsObject.prototype.render = function() {
  $('#photo-template').append(`
  <a class="${this.keyword}">
  <h2>${this.title}</h2>
  <img src="${this.image_url}">
  <p>${this.description}</p>
  </a>
  `)
}

function makeHornsObjects(item) {
  new HornsObject(
    item.image_url,
    item.title,
    item.description,
    item.keyword,
    item.horns
  )
}
  
function addSelectOptions() {
  let selectOptions = [];
  hornsCatalog.forEach(item => {
    let matching = false;
    selectOptions.forEach(value => {
      if (value === item.keyword) {matching = true;}
    })
    if (matching === false) { selectOptions.push(item.keyword)    }
  })
  selectOptions.forEach(value => {
    $('select').append(`<option>${value}</option`)
  })
}

function selectFilter() {
  let click = 0;
  $('select').on('click', function() {
    click++
    if (click % 2 === 0) {
      $('a').hide();
      $(`.${this.value}`).show();
    }
    console.log(this.value);
  })
}
