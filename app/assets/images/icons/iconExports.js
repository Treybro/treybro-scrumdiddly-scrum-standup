/**
 * @providesModule IconAssets
 */

import addIcon from "./icon-add.png";
import editIcon from "./icon-edit.png";
import menuIcon from "./icon-menu.png";
import removeIcon from "./icon-remove.png";
import clipboardIcon from "./icon-clipboard.png";
import pencilIcon from "./icon-pencil.png";
import settingsIcon from "./icon-settings.png";
import calendarIcon from "./icon-calendar.png";
import checkIcon from "./icon-check.png";
import uncheckedIcon from "./icon-unchecked.png";
import tickIcon from "./icon-tick.png";
import binIcon from "./icon-bin.png";
import cancelIcon from "./icon-cancel.png";
import okIcon from "./icon-ok.png";
import warningIcon from "./icon-warning.png";
import blockerIcon from "./icon-blocker.png";
import historyIcon from "./icon-history.png";

export default function getIconAsset (assetName) {

	switch (assetName) {

	case "addIcon":
		return addIcon;
	case "editIcon":
		return editIcon;
	case "menuIcon":
		return menuIcon;
	case "removeIcon":
		return removeIcon;
	case "clipboardIcon":
		return clipboardIcon;
	case "pencilIcon":
		return pencilIcon;
	case "settingsIcon":
		return settingsIcon;
	case "calendarIcon":
		return calendarIcon;
	case "checkIcon":
		return checkIcon;
	case "uncheckedIcon":
		return uncheckedIcon;
	case "tickIcon":
		return tickIcon;
	case "binIcon":
		return binIcon;
	case "cancelIcon":
		return cancelIcon;
	case "okIcon":
		return okIcon;
	case "warningIcon":
		return warningIcon;
	case "blockerIcon":
		return blockerIcon;
	case "historyIcon":
		return historyIcon;
	}
}