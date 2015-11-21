var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Band Members Model
 * =============
 */

var Musicians = new keystone.List('Musicians', {
  label: 'Музыканты',
  singular: 'Музыкант',
  plural: 'Музыканты',
  defaultSort: 'priority',
  sortable: true,
  defaultColumns: 'enabled, name, role,  priority',
});

Musicians.add({
	name: { type: Types.Text, initial: true, required: true, label: 'Имя' },
	role: { type: Types.Text, initial: true, required: true, label: 'Роль в группе' },
  url: {type: Types.Url, label: 'Ссылка на фото'},
  priority: {type: Types.Number, default: 1, label: 'Приоритет'},
  enabled: {type: Types.Boolean, default: false, label: 'Показывать на сайте'}
});

Musicians.register();
