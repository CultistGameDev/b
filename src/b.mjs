'use strict';

/**
 * Default Parameters for the {@link b b()} function.
 * @type {{ query: string; b: B; }}
 */
const DefaultBParams = {
  query: undefined,
  b: undefined,
};

class B {
  /**
   * @param {Object} options options for the B class
   * @param {string} options.query a string containing a query for B to find
   * @param {B} options.b another instance of B to copy
   */
  constructor({ query, b }) {
    if (query) {
      this.elements = document.querySelectorAll(query);
      return;
    }
    if (b) {
      this.elements = b.elements;
    }
  }

  /**
   * Get the HTML from with the element contained in B at index i.
   * @param {number} [i=0] the index of the element to get HTML from
   * @returns {string}
   */
  getHtml(i = 0) {
    return this.elements[0].innerHTML;
  }

  /**
   * Replace the HTML with the elements contained in b with value.
   * @param {string} value the HTML to be placed inside.
   * @param {number} [i=0] the index of the element to set HTML for
   * @returns {B} the same instance
   */
  setHtml(value, i = 0) {
    this.elements[i].innerHTML = value;
    return this;
  }

  /**
   * Get an attribute attached to elements
   * @param {string} name the attribute name.
   * @param {number} [i=0] the index of the element to get attribute for.
   * @returns {string|null}
   */
  getAttr(name, i = 0) {
    return this.elements[i].getAttribute(name);
  }

  /**
   * Sets an attribute to the elements selected.
   * @param {string} name attribute name
   * @param {string} value attribute value
   * @param {number} [i=0] the index of the element to set attribute for
   * @returns {B}
   */
  setAttr(name, value, i = 0) {
    this.elements[i].setAttribute(name, value);
    return this;
  }

  /**
   * Callback for iteration.
   *
   * @callback forEachCallback
   * @param {any} value the current value of the iteration.
   * @param {number} [i] the index into the array
   * @param {[any]} [array] the underlying array beging iterated over.
   */

  /**
   * Iterates over ever all elementss currently selected
   * @param {forEachCallback} fn callback for iteration.
   */
  forEach(fn) {
    if (Array.isArray(this.elements)) {
      this.elements.forEach(fn, this);
    }
  }

  /**
   * Add a B instance to the current elements
   * @param {B} obj elements to add
   * @param {number} [i1=0] the index of the element to be written to
   * @param {number} [i2=0] the index of the element to be copied from
   * @returns {B} this instance
   */
  append(obj, i1 = 0, i2 = 0) {
    this.elements[i1].innerHTML += obj.elements[i2].outerHTML;
    return this;
  }
}

/**
 * Creates an instancec of the B class.
 * @param {(string|B)} arg
 * @returns an instance of B
 */
export default function b(arg) {
  if (typeof arg === 'function') {
    return new B({ ...DefaultBParams, b: /** @type {B} */ (arg) });
  }
  return new B({ ...DefaultBParams, query: /** @type {string} */ (arg) });
}
