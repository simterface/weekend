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

Songs.add({
	name: { type: Types.Text, initial: true, required: true, label: 'Название' },
	singer: { type: Types.Text, initial: true, required: true, label: 'Исполнитель' },
	album: { type: String, label: 'Альбом' },
	year: { type: Types.Number, label: 'Год' },
  file: {
    type: Types.LocalFile,
    label: 'Файл (.m4a)',
    dest: 'public/audio',
    allowedTypes: [
      'audio/x-m4a'
      // 'audio/aac',
      // 'audio/mpeg'
    ]
  }
});

Songs.register();
