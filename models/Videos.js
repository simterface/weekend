var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Videos Model
 * =============
 */

var Videos = new keystone.List('Videos', {
  label: 'Демо видео',
  singular: 'Видео',
  plural: 'Видео',
  defaultSort: 'priority',
  sortable: true,
  defaultColumns: 'enabled, song,  priority',
  map: {name: 'song'}
});

Videos.add({
	song: { type: Types.Text, initial: true, required: true, label: 'Песня' },
  url: {type: Types.Url, initial: true, required: true, label: 'Ссылка YouTube'},
  priority: {type: Types.Number, default: 1, label: 'Приоритет'},
  enabled: {type: Types.Boolean, default: false, label: 'Показывать на сайте'}
});

// Provide access to Keystone
Videos.schema.virtual('showOnSite').get(function() {
	return this.enabled;
});

Videos.register();
