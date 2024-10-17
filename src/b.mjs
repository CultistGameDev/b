'use strict';

const DefaultBParams = {
  /** @type {string} */
  query: undefined,
  /** @type {B} */
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
      this.element = document.querySelector(query);
      return;
    }
    if (b) {
      this.element = b.element;
    }
  }

  /**
   * Get the HTML from with the element contained in B.
   */
  getHtml() {
    return this.element.innerHTML;
  }

  /**
   * Replace the HTML with the element contained in b with value.
   * @param {string} value the HTML to be placed inside.
   * @returns {B} the same instance
   */
  setHtml(value) {
    this.element.innerHTML = value;
    return this;
  }

  /**
   * Get an attribute attached to element
   * @param {string} name the attribute name.
   * @returns {string|null}
   */
  getAttr(name) {
    return this.element.getAttribute(name);
  }

  /**
   * Sets an attribute to the element selected.
   * @param {string} name attribute name
   * @param {string} value attribute value
   * @returns {B}
   */
  setAttr(name, value) {
    this.element.setAttribute(name, value);
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
   * Iterates over ever all elements currently selected
   * @param {forEachCallback} fn callback for iteration.
   */
  forEach(fn) {
    if (Array.isArray(this.element)) {
      this.element.forEach(fn, this);
    }
    fn(this.element, 0, [this.element]);
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
