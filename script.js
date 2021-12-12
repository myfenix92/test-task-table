  class TableDataEditorClass {

    setData() {
      let textAreaData = document.querySelector('textarea');
      let data = JSON.parse(textAreaData.value);
      let table = document.querySelector('.main__table');
      table.innerHTML = '';
      
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
      btnBlock.insertAdjacentHTML('afterbegin', '<h4>Удалить</h4>')
      table.appendChild(btnBlock)
      data.forEach((el) => {
        let btnDelete = document.createElement('input');
        
        btnDelete.setAttribute('type', 'checkbox')
        btnBlock.appendChild(btnDelete)
        
        document.querySelector('.name').insertAdjacentHTML('beforeend', `<input value="${el.name}">`);
        document.querySelector('.value').insertAdjacentHTML('beforeend', `<input value="${el.value}">`);
      })

    //  document.querySelector('.header__btn-load').disabled = true;
      document.querySelector('.header__btn-save').disabled = false;
      document.querySelector('.main__btn-add').classList.add('show');
      document.querySelector('.main__btn-delete').classList.add('show');
      // document.querySelectorAll('input').forEach((e) => {
      //   e.removeAttribute('readonly');
      // })
    }

    getData() {
      let nameArr = Array.from(document.querySelectorAll('.name > input'))
                          .map(e => e.value)
      let valueArr = Array.from(document.querySelectorAll('.value > input'))
                          .map(e => e.value)                   
      document.querySelector('textarea').value = '';
      let dataSave = nameArr.map((_, i) => ({['name']: nameArr[i], ['value']: valueArr[i]}));
      document.querySelector('textarea').value = JSON.stringify(dataSave);

    // document.querySelector('.header__btn-load').disabled = false;
    // document.querySelector('.header__btn-save').disabled = true;
      // document.querySelectorAll('input').forEach((e) => {
      //   e.setAttribute('readonly', true);
      // });
    }

    addData() {
      document.querySelector('.name').insertAdjacentHTML('beforeend', `<input>`);
      document.querySelector('.value').insertAdjacentHTML('beforeend', `<input>`);
      document.querySelector('.row-delete').insertAdjacentHTML('beforeend', `<input type="checkbox">`);
    }

    deleteData() {
      let indexArr = []
      document.querySelectorAll('input[type="checkbox"]').forEach((e, i) => {
      if (e.checked) {
        indexArr.push(i)
        e.remove();
      }
    });
      document.querySelectorAll('.name > input').forEach((name, ind) => {
        indexArr.includes(ind) ? name.remove() : null;
        });

      document.querySelectorAll('.value > input').forEach((value, ind) => {
        indexArr.includes(ind) ? value.remove() : null;
        });
   
    }
  }

  const TableDataEditor = new TableDataEditorClass();
  document.querySelector('.header__btn-load').addEventListener('click', TableDataEditor.setData)
  document.querySelector('.header__btn-save').addEventListener('click', TableDataEditor.getData)
  document.querySelector('.main__btn-add').addEventListener('click', TableDataEditor.addData)
  document.querySelector('.main__btn-delete').addEventListener('click', TableDataEditor.deleteData)