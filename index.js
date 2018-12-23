
import { NativeModules, ActionSheetIOS, Platform } from 'react-native';

class CCSActionSheet {

	show(options, index = -1, etc = { title: '', message: '', androidCancelHide: false, cancelLabel : '', tintColor: '' }) {

		this.isOptionObject = (options?.length && options[0] instanceof Object);

		let buttons = [];
		if (this.isOptionObject) {
			this.options = options;
			buttons = buttons.concat(this.options.map((v) => (v.label)));
		}
		else {
			buttons = buttons.concat(options);
		}

		if (Platform.OS == 'ios' || !etc?.androidCancelHide) {
			this.usedCancel = true;
			buttons.push((etc?.cancelLabel ? etc?.cancelLabel : 'Cancel'));
		}
		else {
			this.usedCancel = false;
		}

		const native = (Platform.OS == 'ios') ? ActionSheetIOS : (Platform.OS == 'android') ?  NativeModules.RNCActionsheet : null;

		return new Promise((resolve, reject) => {
			
			if (native == null) reject('Not Support Device');

			try {

				let params = {
					options: buttons,
					cancelButtonIndex: buttons.length - 1,
					destructiveButtonIndex: index
				};
		
				if (etc?.title) params.title = etc.title;
				if (etc?.message) params.message = etc.message;
				if (etc?.tintColor) params.tintColor = etc.tintColor;

				native.showActionSheetWithOptions(params, (buttonIndex) => {
					if (buttonIndex == undefined || (this.usedCancel && buttonIndex == buttons.length - 1)) {
						reject("User Cancelled");
						return;
					}

					let o = {};
					if (this.isOptionObject) {
						o.item = this.options[buttonIndex];
					}
					
					o.index = buttonIndex;
					o.label = buttons[buttonIndex];
					o.isDestructive = (buttonIndex == index);

					resolve(o);
				});
			}
			catch(e) {
				console.log(e);
				reject(e);
			}
		});

	}
}

const ActionSheet = new CCSActionSheet();
export default ActionSheet;
