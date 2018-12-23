
import { NativeModules, ActionSheetIOS, Platform } from 'react-native';

class CCSActionSheet {

	show(options, index = -1, etc = { title: '', androidCancelHide: false, cancelLabel : '' }) {

		if (Platform.OS == 'ios') {
			return new Promise((resolve, reject) => {
				try {
					let buttons = [ ...options, (cancelLabel ? cancelLabel : 'Cancel') ];
					ActionSheetIOS.showActionSheetWithOptions({
						title : etc?.title,
						options: buttons,
						cancelButtonIndex: buttons.length - 1,
						destructiveButtonIndex: index
					}, (buttonIndex) => {
						if (buttonIndex == undefined && buttonIndex == buttons.length - 1) return;
						resolve({ index: buttonIndex, label: buttons[buttonIndex], isDestructive: (buttonIndex == index) });
					});
				}
				catch(e) {
					reject(e);
				}
			});
		}

	}
}

const ActionSheet = new CCSActionSheet();
export default ActionSheet;
