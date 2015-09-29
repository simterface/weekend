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
  defaultColumns: 'singer, name, album'
});

// TODO: Add song file upload from admin UI
Songs.add({
	name: { type: Types.Text, initial: true, required: true, label: 'Название' },
	singer: { type: Types.Text, initial: true, required: true, label: 'Исполнитель' },
	album: { type: String, label: 'Альбом' },
	year: { type: Types.Number, default: 2015, label: 'Год' },
  recordUrl: {type: Types.Url, label: 'Ссылка на запись'},
  singerSite: {type: Types.Url, label: 'Сайт исполнителя'}
});

Songs.register();
