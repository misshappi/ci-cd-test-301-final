'use strict';

const cheerio = require('cheerio');

/*
--------------------------------------------------------------------------
Without altering the html, write a function named generateSubmitButton

This function must use jQuery to:
 - Create a submit button with the text "submit"
 - Append it to the DOM.

Remember, in this test, $ is jQuery, just as it is in a normal web app
--------------------------------------------------------------------------
*/


let $ = createSnippetWithJQuery(`
<section>
  <form>
    <label> Frist Name:
      <input type="text" name="first" />
    </label>

    <label> Last Name:
      <input type="text" name="last" />
    </label>
  </form>
</section>
`);

const generateSubmitButton = () => {
  // Solution code here ...
  $('form').append('<button>submit</button>');
}

///////////////////////////////////////////////////
// TESTS
///////////////////////////////////////////////////

describe('Testing challenge', () => {
  test('It should add a submit button to the DOM', () => {
    generateSubmitButton();
    expect($('button').text()).toStrictEqual('submit');
  })
});

function createSnippetWithJQuery(html) {
  return cheerio.load(html);
};
