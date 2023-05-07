    //XML+notification
    (function() {
        var saveButton = document.getElementById('submit');
        saveButton.addEventListener('click', function(e) {
          e.preventDefault();
    
          // собираем данные из формы
          var name = document.getElementById('name').value;
          var email = document.getElementById('email').value;
          var review = document.getElementById('review').value;
    
          // проверяем, содержит ли email символ "@"
          var emailIsValid = email.includes("@");
    
          // сохраняем данные в XML
          var xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
          xml += '<data>\n';
          xml += '  <email>' + email + '</email>\n';
          xml += '  <name>' + name + '</name>\n';
          xml += '  <review>' + review + '</review>\n';
          xml += '</data>';
    
          // отправляем XML-файл на сервер (можно использовать XMLHttpRequest())
    
          // отображаем уведомление на экране
          var notification = document.createElement('div');
          notification.className = 'notification';
    
          if (name === '' || review === "") {
            notification.innerHTML = '<button>&times;</button><p>Калі ласка, запоўніце форму</p>';
          } 
          else if (email === "") {
            notification.innerHTML = '<button>&times;</button><p>Калі ласка, запоўніце email</p>';
          } 
          else if (!emailIsValid) {
            notification.innerHTML = '<button>&times;</button><p>Калі ласка, запоўніце email правільна</p>';
          } 
          else {
            notification.innerHTML = '<button>&times;</button><p>Дзякуем, ' + name + ', за ваш водгук!</p>';
          }
    
          document.body.appendChild(notification);
    
          // установим обработчик на кнопку закрытия уведомления
          var closeButton = notification.querySelector('button');
          closeButton.addEventListener('click', function() {
            document.body.removeChild(notification);
          });
        });
      })();
 