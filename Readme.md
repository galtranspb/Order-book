Суть тестового в верстке виджета ордер-бук и подключении его к данным. Виджет должен меняться в ширине от 900 до 1920 пкс.

Таблица скроллится внутри (оба столбца скроллятся одновременно), шапка остается на месте. Полоса скролл-бара начинается под шапкой. При скролле значения в таблице не должны наезжать на шапку. В таблице должен быть только один скролл-бар.

Цветные бары строятся по полю тотал, которое нужно рассчитывать на фронте, тотал суммирует все amount выше в таблице (см. скриншот). График максимального для обоих направлений тотала должен занимать 100% ширины, все остальные — меньше. В Json два массива — bids для левой колонки, asks — для правой.

При изменении текста заголовков колонок, текст заголовков не должен наезжать на соседние колонки (если позволяет ширина виджета). Это необходимо для локализации (amount/количество и т.д.).

Строки в таблице должны менять цвет фона при хавере (немного затемняться), независимо: отдельно bid-сторона, отдельно ask.

Скролл-бар в таблице должен появляться по хаверу на таблицу. внешний вид скроллбара не принципиален.

Дополнительные элементы виджета не функциональны в тестовом задании. Их нужно просто расположить на странице как на скриншоте. То есть, блок не сворачивается, на иконки инфо и настройки ничего не происходит.

Браузеры: chrome, firefox, safari, edge (последние десктоп версии).

Недопустимо использование сторонних библиотек, строящих таблицы, графики, или работающих со скроллом.
Код должен быть чистый и понятный, возможно использование препроцессоров.
Внешний вид должен соответствовать макету (блок виджета, тени и т.д. обязательны).

https://galtranspb.github.io/Order-book/
