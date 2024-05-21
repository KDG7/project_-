document.addEventListener('DOMContentLoaded', function() {
    const dataUrl = 'http://127.0.0.1:7000/userInfo/';  // JSON 데이터를 가져올 API URL
    const loadButton = document.getElementById('load-button');
    const table = document.getElementById('data-table');

    loadButton.addEventListener('click', function() {
        fetch(dataUrl) //데이터를 가지고 온다. dataurl에서부터
            .then(response => response.json())
            .then(data => {
                const tableBody = document.querySelector('#data-table tbody');
                tableBody.innerHTML = ''; // 테이블을 초기화합니다.

                data.forEach(item => { //for each를 돌려서 item을 다 가지고 표에 넣겠다.

                    const row = document.createElement('tr');

                    const numCell = document.createElement('td');
                    numCell.textContent = item.bookid;
                    row.appendChild(numCell);
                    
                    const nameCell = document.createElement('td');
                    nameCell.textContent = item.bookname;
                    row.appendChild(nameCell);
                    
                    const gradeCell = document.createElement('td');
                    gradeCell.textContent = item.publisher;
                    row.appendChild(gradeCell);

                    const scoreCell = document.createElement('td');
                    scoreCell.textContent = item.price;
                    row.appendChild(scoreCell);

                    tableBody.appendChild(row);
                });

                table.style.display = 'table'; // 테이블을 표시합니다.
            })
            .catch(error => {
               
                console.error('Error fetching the data:', error);
            });
    });
});
