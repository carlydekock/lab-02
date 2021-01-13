'use strict';

function Horns (name, url, description, keyword, horns){
  this.title = name;
  this.image_url = url;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}

Horns.prototype.render = function(){
  const $hornsClone = $('li:first-child').clone();
  const $h2 = $hornsClone.find('h2');
  $h2.text(this.title);

  const $img = $hornsClone.find('img');
  $img.attr('src', this.image_url);
  $img.attr('alt', this.description);

  $hornsClone.find('p').text(this.description);

  $('ul').append($hornsClone);
};

$.ajax('/data/page-1.json').then(stuffThatComesBack => {
  console.log(stuffThatComesBack);

  const hornsInstances = [];
  stuffThatComesBack.forEach((horn) => {
    hornsInstances.push(new Horns(horn.title, horn.image_url, horn.description, horn.keyword, horn.horns));
  });
  console.log(hornsInstances);

  hornsInstances.forEach(horn => {
    horn.render();
  });
});

