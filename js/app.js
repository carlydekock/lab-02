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

$.ajax('data/page-1.json').then(stuffThatComesBack => {
  console.log(stuffThatComesBack);

  const hornsInstances = [];
  stuffThatComesBack.forEach((horn) => {
    hornsInstances.push(new Horns(horn.title, horn.image_url, horn.description, horn.keyword, horn.horns));
  });
  console.log(hornsInstances);

  //create unique keyword array here if do .includes on line 44
  const uniqueKeywords = [];
  hornsInstances.forEach(horn => {
    horn.render();
    //tip from Skyler(TA) use .includes() to check if this horn's keyword is included in the unique keywords array
    const unique = uniqueKeywords.includes(horn.keyword);
    //if it isn't (.includes() will return false) then push into the unique keywords aray
    if (unique === false){
      uniqueKeywords.push(horn.keyword);
    }
  });
  // console.log(uniqueKeywords);
  //take the unique keywords array here, and render the option elements for the dropdown
  uniqueKeywords.forEach(keyword => {
    const $optionClone = $('option:first-child').clone();
    $optionClone.attr('value', keyword);
    $optionClone.text(keyword);
    $('select').append($optionClone);
  });

  $('select').on('change', function() {
    //tip from Nicco(TA) to grab this.val()
    const chosenKeyword = $(this).val();
    // console.log($(this).val());
    //goal is to show only images with keyword of whatever was selected from dropdown
    //target all list items and hide them
    $('li').hide();
    //target items with keyword of what was selected
    $(`li:contains(${chosenKeyword})`).show();
    //tip from Nicco(TA) to bring all elements back if user goes back to select default
    if (chosenKeyword === 'default'){
      $('li').show();
    }
  });
});


