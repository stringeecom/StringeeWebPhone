function StringeeHashMap() {
	var obj = [];
	obj.size = function () {
		return this.length;
	};
	obj.isEmpty = function () {
		return this.length === 0;
	};
	obj.containsKey = function (key) {
		key = key + '';

		for (var i = 0; i < this.length; i++) {
			if (this[i].key === key) {
				return i;
			}
		}
		return -1;
	};
	obj.get = function (key) {
		key = key + '';

		var index = this.containsKey(key);
		if (index > -1) {
			return this[index].value;
		}
	};
	obj.put = function (key, value) {
		key = key + '';

		if (this.containsKey(key) !== -1) {
			return this.get(key);
		}
		this.push({'key': key, 'value': value});
	};
	obj.allKeys = function () {
		var allKeys = [];
		for (var i = 0; i < this.length; i++) {
			allKeys.push(this[i].key);
		}
		return allKeys;
	};
	obj.allIntKeys = function () {
		var allKeys = [];
		for (var i = 0; i < this.length; i++) {
			allKeys.push(parseInt(this[i].key));
		}
		return allKeys;
	};
	obj.remove = function (key) {
		key = key + '';

		var index = this.containsKey(key);
		if (index > -1) {
			this.splice(index, 1);
		}
	};
	
	obj.clear = function () {
		var allKeys = this.allKeys();
		for (var i = 0; i < allKeys.length; i++) {
			var key = allKeys[i];
			this.remove(key);
		}
	};

	return obj;
}