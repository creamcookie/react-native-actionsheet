
import { NativeModules } from 'react-native';

const { RNCActionsheet } = NativeModules;

class CCSActionSheet {

	show(options:Array, index:Number = -1, etc = { title: '', androidCancelHide: false, cancelLabel : '' }) {

		let buttons = [ ...options ];
		if (etc?.androidCancelHide) buttons.push((cancelLabel ? cancelLabel : 'Cancel'));

		return RNCActionsheet.show({
			title : etc?.title,
			options: buttons,
			cancelButtonIndex: buttons.length - 1,
			destructiveButtonIndex: index
		});

	}
}

const ActionSheet = new CCSActionSheet();
export default ActionSheet;


