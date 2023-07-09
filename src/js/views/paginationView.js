import View from './View';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      // const goToPage = btn.innerText.match(/\d+/g)[0];
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
  _generateMarkup() {
    // console.log(this._data);
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const prevBtnMarkup = `<button data-goto="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${curPage - 1}
  </button>`;
    const nextBtnMarkup = `<button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
    <span>Page ${curPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>`;
    // Page 1 and there are more pages
    if (curPage === 1 && numPages > 1) return `${nextBtnMarkup}`;
    // On page x and there are previous and next pages
    if (curPage < numPages) return `${prevBtnMarkup} ${nextBtnMarkup}`;
    // On the last page, and there are no more next pages
    if (curPage === numPages && numPages > 1) return `${prevBtnMarkup}`;
    //  Page 1 and there are no more pages
    return ' ';
  }
}
export default new PaginationView();
