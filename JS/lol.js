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
      //3D preview
      var limits = 15.0;
    
    $(".card").mousemove(function (e) {
      var rect = e.target.getBoundingClientRect();
      var x = e.clientX - rect.left; //x position within the element.
      var y = e.clientY - rect.top; //y position within the element.
      var offsetX = x / rect.width;
      var offsetY = y / rect.height;
    
      var rotateY = (offsetX) * (limits * 2) - limits;
      var rotateX = (offsetY) * (limits * 2) - limits;
    
      var shadowOffsetX = (offsetX) * 32 - 16;
      var shadowOffsetY = (offsetY) * 32 - 16;
    
      $(this).css({
        "box-shadow": (1 / 6) * -shadowOffsetX + "px " + (1 / 6) * -shadowOffsetY + "px 3px rgba(0, 0, 0, 0.051), " +
          (2 / 6) * -shadowOffsetX + "px " + (2 / 6) * -shadowOffsetY + "px 7.2px rgba(0, 0, 0, 0.073), " +
          (3 / 6) * -shadowOffsetX + "px " + (3 / 6) * -shadowOffsetY + "px 13.6px rgba(0, 0, 0, 0.09), " +
          (4 / 6) * -shadowOffsetX + "px " + (4 / 6) * -shadowOffsetY + "px 24.3px rgba(0, 0, 0, 0.107), " +
          (5 / 6) * -shadowOffsetX + "px " + (5 / 6) * -shadowOffsetY + "px 45.5px rgba(0, 0, 0, 0.129), " +
          -shadowOffsetX + "px " + -shadowOffsetY + "px 109px rgba(0, 0, 0, 0.18)",
        transform: "perspective(1000px) rotateX(" + -rotateX + "deg) rotateY(" + rotateY + "deg)"
      });
    
      var glarePos = rotateX + rotateY + 90;
      $(this)
        .children()
        .children()
        .css("left", glarePos + "%");
    });
    
    $(".card").mouseleave(function (e) {
      $(".card").css({"box-shadow": "0px 0px 3px rgba(0, 0, 0, 0.051), 0px 0px 7.2px rgba(0, 0, 0, 0.073), 0px 0px 13.6px rgba(0, 0, 0, 0.09), 0px 0px 24.3px rgba(0, 0, 0, 0.107), 0px 0px 45.5px rgba(0, 0, 0, 0.129), 0px 0px 109px rgba(0, 0, 0, 0.18)", "transform": "scale(1.0)"});
      $(".glare").css("left", "100%");
    });
    