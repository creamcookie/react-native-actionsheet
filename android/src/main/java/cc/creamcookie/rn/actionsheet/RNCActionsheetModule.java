
package cc.creamcookie.rn.actionsheet;

import android.app.Activity;
import android.content.DialogInterface;
import android.graphics.Color;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v7.app.AlertDialog;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

import java.util.ArrayList;
import java.util.List;

public class RNCActionsheetModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public RNCActionsheetModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
    return "RNCActionsheet";
    }


    @ReactMethod
    public void showActionSheetWithOptions(final ReadableMap options, final Callback callback) {
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
            WritableMap response = Arguments.createMap();
            response.putString("error", "can't find current Activity");
            callback.invoke(response);
            return;
        }

        final List<String> titles = new ArrayList<String>();
        if (options.hasKey("options")) {
            ReadableArray customButtons = options.getArray("options");
            for (int i = 0; i < customButtons.size(); i++) {
                int currentIndex = titles.size();
                titles.add(currentIndex, customButtons.getString(i));
            }
        }

        final int tintColor = options.hasKey("tintColor") ?
                Color.parseColor(options.getString("tintColor")) :
                Color.parseColor("#333333");

        final int selectedColor = options.hasKey("selectedColor") ?
                Color.parseColor(options.getString("selectedColor")) :
                Color.parseColor("#FF0000");

        final int destructiveIndex = options.hasKey("destructiveButtonIndex") ?
                options.getInt("destructiveButtonIndex") : -1;


        String title = options.hasKey("title") ? options.getString("title") : null;
        String message = options.hasKey("message") ? options.getString("message") : null;

        AlertDialog.Builder builder = new AlertDialog.Builder(currentActivity);
        if ((title != null && !title.isEmpty()) || (message != null && !message.isEmpty())) {

            LayoutInflater inflater = reactContext.getCurrentActivity().getLayoutInflater();
            View view = inflater.inflate(R.layout.title, null);

            if (title != null && !title.isEmpty()) {
                ((TextView) view.findViewById(R.id.header_title)).setText(title);
                ((TextView) view.findViewById(R.id.header_title)).setTextColor(tintColor);
                ((TextView) view.findViewById(R.id.header_title)).setVisibility(View.VISIBLE);
            }
            else {
                ((TextView) view.findViewById(R.id.header_title)).setVisibility(View.GONE);
            }

            if (message != null && !message.isEmpty()) {
                ((TextView) view.findViewById(R.id.header_desc)).setText(message);
                ((TextView) view.findViewById(R.id.header_desc)).setTextColor(tintColor);
                ((TextView) view.findViewById(R.id.header_desc)).setVisibility(View.VISIBLE);
            }
            else {
                ((TextView) view.findViewById(R.id.header_desc)).setVisibility(View.GONE);
            }

            builder.setCustomTitle(view);
        }

        ArrayAdapter<String> adapter = new ArrayAdapter<String>(currentActivity, R.layout.dialog_item, titles) {

            @NonNull
            @Override
            public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
                TextView view = (TextView) super.getView(position, convertView, parent);
                view.setTextColor((destructiveIndex == position) ? selectedColor : tintColor);
                return view;
            }
        };
        builder.setAdapter(adapter, new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int index) {
                callback.invoke(index);
            }
        });

        final AlertDialog dialog = builder.create();

        dialog.setOnCancelListener(new DialogInterface.OnCancelListener() {
            @Override
            public void onCancel(DialogInterface dialog) {
                dialog.dismiss();
                callback.invoke();
            }
        });

        dialog.show();
    }

}