var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Songs Model
 * =============
 */

var Songs = new keystone.List('Songs', {
  label: 'Песни',
  singular: 'Песня',
  plural: 'Песни',
  defaultSort: '-singer',
  sortable: true,
  defaultColumns: 'singer, name'
});

Songs.add({
	name: { type: Types.Text, initial: true, required: true, label: 'Название' },
	singer: { type: Types.Text, initial: true, required: true, label: 'Исполнитель' }
});

Songs.register();
