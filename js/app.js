"use strict";

// Page Specifier
let pageNum = 1;
$('#currentPage').text(pageNum);

//Page Button Listeners
$('#next').on('click', () => {
  pageNum++
  fireAjax();
});

$('#previous').on('click', () => {
  pageNum--
  console.log(pageNum);
  fireAjax();
});

// ajax call
function fireAjax() {
  $.ajax(`../data/page-${pageNum}.json`).then(ajaxCallback);
}
fireAjax(pageNum);

// all the functions, run thorugh ajax
function ajaxCallback(file) {
  $('#currentPage').text(pageNum);
  hornsCatalog = [];
  $('select').empty();
  $('main').empty();
  file.forEach(makeHornsObjects);
  hornsCatalog.forEach(hornPic => {hornPic.render()});
  addSelectOptions();
  selectFilter();
  sorter();
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
  const template = $('#hornTemplate').html();
  let filledTemplate = Mustache.render(template, this);
  $('main').append(filledTemplate);
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
  $('select').append('<option value="default">Filter by Keyword</option>')
  selectOptions.forEach(value => {
    $('select').append(`<option value="${value}">${value}</option`)
  })
}

function selectFilter() {
  $('select').on('change', function(e) {
    console.log(e.target.value);
      $('section').hide();
      $(`.${e.target.value}`).show();
    })
  }

  function sorter() {
    
  }