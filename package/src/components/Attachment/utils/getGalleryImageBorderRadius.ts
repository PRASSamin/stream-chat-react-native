import type { GallerySizeConfig } from './buildGallery/types';

import type { MessageContextValue } from '../../../contexts/messageContext/MessageContext';

type Params = {
  colIndex: number;
  numOfColumns: number;
  numOfRows: number;
  rowIndex: number;
  sizeConfig: GallerySizeConfig;
  hasThreadReplies?: boolean;
  height?: number;
  invertedDirections?: boolean;
  messageText?: string;
  threadList?: boolean;
  width?: number;
} & Pick<MessageContextValue, 'groupStyles' | 'alignment'>;

export function getGalleryImageBorderRadius({
  alignment,
  colIndex,
  groupStyles,
  hasThreadReplies,
  height,
  invertedDirections,
  messageText,
  numOfColumns,
  numOfRows,
  rowIndex,
  sizeConfig,
  threadList,
  width,
}: Params) {
  const isSingleImage = numOfColumns === 1 && numOfRows === 1;
  const isImageSmallerThanMinContainerSize =
    isSingleImage &&
    height &&
    width &&
    ((height > width && width === sizeConfig.minWidth) ||
      (height < width && height === sizeConfig.minHeight));

  const topLeftEdgeExposed = colIndex === 0 && rowIndex === 0;
  const bottomLeftEdgeExposed =
    (!invertedDirections && colIndex === 0 && rowIndex === numOfRows - 1) ||
    (invertedDirections && colIndex === numOfColumns - 1 && rowIndex === 0);
  const topRightEdgeExposed =
    (!invertedDirections && colIndex === numOfColumns - 1 && rowIndex === 0) ||
    (invertedDirections && colIndex === 0 && rowIndex === numOfRows - 1);
  const bottomRightEdgeExposed = colIndex === numOfColumns - 1 && rowIndex === numOfRows - 1;

  const isLastMessage = groupStyles?.[0] === 'bottom' || groupStyles?.[0] === 'single';
  const isMyMessage = alignment === 'right';

  return {
    borderBottomLeftRadius:
      !isImageSmallerThanMinContainerSize &&
      bottomLeftEdgeExposed &&
      (!isLastMessage || hasThreadReplies || isMyMessage)
        ? 14
        : 0,

    borderBottomRightRadius:
      !isImageSmallerThanMinContainerSize &&
      bottomRightEdgeExposed &&
      (!isLastMessage || hasThreadReplies || !isMyMessage)
        ? 14
        : 0,

    borderTopLeftRadius: !isImageSmallerThanMinContainerSize && topLeftEdgeExposed ? 14 : 0,
    borderTopRightRadius: !isImageSmallerThanMinContainerSize && topRightEdgeExposed ? 14 : 0,
  };
}
