var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Images Model
 * =============
 */

var Images = new keystone.List('Images', {
  label: 'Фотографии',
  singular: 'Фото',
  plural: 'Фото',
  defaultSort: 'priority',
  sortable: true,
  defaultColumns: 'enabled, title,  priority',
  map: {name: 'title'}
});

Images.add({
	title: { type: Types.Text, initial: true, required: true, label: 'Название' },
  url: {type: Types.Url, initial: true, required: true, label: 'Ссылка на фото'},
  priority: {type: Types.Number, default: 1, label: 'Приоритет'},
  enabled: {type: Types.Boolean, default: false, label: 'Показывать на сайте'}
});

Images.register();
