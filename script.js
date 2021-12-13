function sortByField(property) {
  return function (a, b) {
    let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    return result;
  }
}
class TableDataEditorClass {

  setData() {
    let textAreaData = document.querySelector('textarea');
    let data;
    let table = document.querySelector('.main__table');

    try {
      table.innerHTML = '';
      data = JSON.parse(textAreaData.value);
      document.querySelector('.header__error-text').textContent = '';
      let listKey = [...new Set(data.map(key => Object.keys(key)).flat())];
      listKey.forEach((key) => {
        let tableRowBlock = document.createElement('div');
        tableRowBlock.classList.add('main__table__inputData', `${key}`);

        let headerTable = document.createElement('h4');
        headerTable.textContent = key;

        tableRowBlock.appendChild(headerTable);
        table.append(tableRowBlock);
      });

      let btnBlock = document.createElement('div');
      btnBlock.classList.add('main__table__inputData', 'row-delete');
      table.appendChild(btnBlock);

      data.forEach((el) => {
        let btnDelete = document.createElement('input');

        btnDelete.setAttribute('type', 'checkbox');
        btnBlock.appendChild(btnDelete);

        document.querySelector('.name').insertAdjacentHTML('beforeend', `<input type="text" value="${el.name}">`);
        document.querySelector('.value').insertAdjacentHTML('beforeend', `<input type="text" value="${el.value}">`);
      })

      document.querySelector('.header__btn-save').disabled = false;
      document.querySelector('.main__btn-add').classList.add('show');
      document.querySelector('.main__btn-delete').classList.add('show');
    } catch (e) {
      document.querySelector('.main__btn-add').classList.remove('show');
      document.querySelector('.main__btn-delete').classList.remove('show');
      if (textAreaData.value === '') {
        textAreaData.placeholder = 'Введите корректные данные в формате JSON';
      } else {
        document.querySelector('.header__error-text').textContent = 'Введите корректные данные в формате JSON';
      }
    }
  }

  getData() {
    let nameArr = Array.from(document.querySelectorAll('.name > input'))
      .map(e => e.value);
    let valueArr = Array.from(document.querySelectorAll('.value > input'))
      .map(e => e.value);
    document.querySelector('textarea').value = '';
    let dataSave = nameArr.map((_, i) => ({
      ['name']: nameArr[i],
      ['value']: valueArr[i]
    }));
    document.querySelector('textarea').value = JSON.stringify(dataSave);
  }

  sortData(event) {
    let nameArr = Array.from(document.querySelectorAll('.name > input'))
      .map(e => e.value);
    let valueArr = Array.from(document.querySelectorAll('.value > input'))
      .map(e => e.value);
    let dataSave = nameArr.map((_, i) => ({
      ['name']: nameArr[i],
      ['value']: valueArr[i]
    }));

    dataSave.sort(sortByField(event.target.textContent)).forEach((e, i) => {
      document.querySelectorAll('.name > input')[i].value = e.name;
      document.querySelectorAll('.value > input')[i].value = e.value;
    });
  }

  addData() {
    document.querySelector('.name').insertAdjacentHTML('beforeend', `<input type="text">`);
    document.querySelector('.value').insertAdjacentHTML('beforeend', `<input type="text">`);
    document.querySelector('.row-delete').insertAdjacentHTML('beforeend', `<input type="checkbox">`);
  }

  deleteData() {
    let indexArr = [];
    document.querySelectorAll('input[type="checkbox"]').forEach((e, i) => {
      if (e.checked) {
        indexArr.push(i);
        e.remove();
      }
    });
    document.querySelectorAll('.name > input').forEach((name, ind) => {
      indexArr.includes(ind) ? name.remove() : null;
    });

    document.querySelectorAll('.value > input').forEach((value, ind) => {
      indexArr.includes(ind) ? value.remove() : null;
    });

    document.querySelectorAll('.name > input').length === 0 ? document.querySelector('.header__btn-save').disabled = true :
      document.querySelector('.header__btn-save').disabled = false;
  }
}

const TableDataEditor = new TableDataEditorClass();

document.querySelector('.header__btn-load').addEventListener('click', TableDataEditor.setData);
document.querySelector('.header__btn-save').addEventListener('click', TableDataEditor.getData);
document.querySelector('.main__btn-add').addEventListener('click', TableDataEditor.addData);
document.querySelector('.main__btn-delete').addEventListener('click', TableDataEditor.deleteData);
document.querySelector('body').addEventListener('click', TableDataEditor.sortData);