import * as React from 'react';
import Svg, {
  Defs,
  ClipPath,
  Circle,
  G,
  Image,
  Path,
  Rect,
  Polygon,
  SvgProps,
} from 'react-native-svg';
import {Colors, PixelPerfect} from '../../styles/stylesConstants';

export const PhoneIcon = props => (
  <Svg
    width={PixelPerfect(24)}
    height={PixelPerfect(24)}
    fill="#9093A3"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    className="bi bi-phone"
    {...props}>
    <Path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z" />
    <Path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
  </Svg>
);

export const SudiFlag = props => (
  <Svg
    id="Bitmap_Copy_2"
    data-name="Bitmap Copy 2"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    {...props}>
    <Defs>
      <ClipPath id="clip-path">
        <Circle id="Mask" cx={12} cy={12} r={12} fill="#d8d8d8" />
      </ClipPath>
    </Defs>
    <Circle
      id="Mask-2"
      data-name="Mask"
      cx={12}
      cy={12}
      r={12}
      fill="#d8d8d8"
    />
    <G
      id="Bitmap_Copy_2-2"
      data-name="Bitmap Copy 2"
      clipPath="url(#clip-path)">
      <Image
        id="Bitmap"
        width={33.6}
        height={33.6}
        transform="translate(-4.8 -4.8)"
        xlinkHref="data:image/png;base64,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"
      />
    </G>
  </Svg>
);

export const LockIcon = props => (
  <Svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 485 485"
    style={{
      enableBackground: 'new 0 0 485 485',
    }}
    xmlSpace="preserve"
    width={PixelPerfect(24)}
    height={PixelPerfect(24)}
    fill="#9093A3"
    {...props}>
    <Path d="M345,175v-72.5C345,45.981,299.019,0,242.5,0S140,45.981,140,102.5V175H70v310h345V175H345z M170,102.5 c0-39.977,32.523-72.5,72.5-72.5S315,62.523,315,102.5V175H170V102.5z M385,455H100V205h285V455z" />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
  </Svg>
);

export const EyeIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    enableBackground="new 0 0 512 512"
    width={PixelPerfect(24)}
    height={PixelPerfect(24)}
    fill="#9093A3"
    {...props}>
    <G>
      <G>
        <Path d="m497.6,244.7c-63.9-96.7-149.7-150-241.6-150-91.9,1.42109e-14-177.7,53.3-241.6,150-4.5,6.8-4.5,15.7 0,22.5 63.9,96.7 149.7,150 241.6,150 91.9,0 177.7-53.3 241.6-150 4.5-6.8 4.5-15.6 0-22.5zm-241.6,131.7c-74.2,0-144.8-42.6-199.9-120.4 55-77.8 125.6-120.4 199.9-120.4 74.2,0 144.8,42.6 199.9,120.4-55.1,77.8-125.6,120.4-199.9,120.4z" />
        <Path d="m256,148.5c-59.3,0-107.5,48.2-107.5,107.5 0,59.3 48.2,107.5 107.5,107.5s107.5-48.2 107.5-107.5c0-59.3-48.2-107.5-107.5-107.5zm0,175.5c-36.8,0-66.8-30.5-66.8-68 0-37.5 30-68 66.8-68 36.8,0 66.8,30.5 66.8,68 0,37.5-30,68-66.8,68z" />
      </G>
    </G>
  </Svg>
);

export const RightArrowIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={14}
    viewBox="0 0 7 14"
    {...props}>
    <Path
      id="Right_arrow"
      data-name="Right arrow"
      d="M-6.571,14a.424.424,0,0,1-.3-.128.442.442,0,0,1,0-.618L-.942,7.206a.3.3,0,0,0,0-.413L-6.874.747a.442.442,0,0,1,0-.618.422.422,0,0,1,.607,0L-.335,6.175A1.168,1.168,0,0,1,0,7a1.168,1.168,0,0,1-.335.825l-5.932,6.047a.424.424,0,0,1-.3.128"
      transform="translate(7)"
      fill={props.fill ? props.fill : '#9b9b9b'}
    />
  </Svg>
);



export const ShareIcon = props => (
<Svg xmlns="http://www.w3.org/2000/svg" width={PixelPerfect(24)} height={PixelPerfect(24)}>
<Path 
    d="M18,6 L6,12 L18,18" 
    stroke="#ffffff" 
    stroke-width="1.5" 
    stroke-linecap="round" 
    stroke-linejoin="round" 
    fill="none"
  />
  <Circle cx="18" cy="6" r="2.5" fill="#ffffff"/>
  <Circle cx="6" cy="12" r="2.5" fill="#ffffff"/>
  <Circle cx="18" cy="18" r="2.5" fill="#ffffff"/>
  </Svg>
);

export const UserIcon = props => (
  <Svg
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 255 255"
    style={{
      enableBackground: 'new 0 0 255 255',
    }}
    xmlSpace="preserve"
    width={PixelPerfect(24)}
    height={PixelPerfect(24)}
    fill="#9093A3"
    {...props}>
    <Path d="M45.732,180.927c0-19.202,7.407-37.341,20.857-51.076l10.717,10.495c-10.688,10.914-16.574,25.326-16.574,40.581V240 h133.535v-59.073c0-15.257-5.885-29.669-16.571-40.583l10.717-10.494c13.448,13.733,20.854,31.873,20.854,51.077V255H45.732V180.927 z M58.016,75.11c0-16.761,1.368-35.911,11.519-50.856C80.618,7.934,99.579,0,127.5,0s46.882,7.934,57.966,24.254 c10.15,14.945,11.519,34.095,11.519,50.856c0,38.315-31.171,69.487-69.484,69.487S58.016,113.426,58.016,75.11z M73.016,75.11 c0,30.044,24.441,54.487,54.484,54.487s54.484-24.443,54.484-54.487c0-14.481-1.061-30.846-8.928-42.429 C164.977,20.784,150.075,15,127.5,15s-37.477,5.784-45.557,17.681C74.076,44.265,73.016,60.629,73.016,75.11z" />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
  </Svg>
);

export const IdCardIcon = props => (
  <Svg
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 260.666 260.666"
    style={{
      enableBackground: 'new 0 0 260.666 260.666',
    }}
    xmlSpace="preserve"
    width={PixelPerfect(24)}
    height={PixelPerfect(24)}
    fill="#9093A3"
    {...props}>
    <G>
      <Path d="M236.666,40.882H24c-13.233,0-24,10.767-24,24v130.902c0,13.233,10.767,24,24,24h212.666c13.233,0,24-10.767,24-24V64.882 C260.666,51.648,249.899,40.882,236.666,40.882z M245.666,195.784c0,4.962-4.037,9-9,9H24c-4.963,0-9-4.038-9-9V64.882 c0-4.962,4.037-9,9-9h212.666c4.963,0,9,4.038,9,9V195.784z" />
      <Path d="M216.04,83.703h-68.933c-3.314,0-6,2.687-6,6s2.686,6,6,6h68.933c3.314,0,6-2.687,6-6S219.354,83.703,216.04,83.703z" />
      <Path d="M216.04,164.963h-68.933c-3.314,0-6,2.686-6,6c0,3.313,2.686,6,6,6h68.933c3.314,0,6-2.687,6-6 C222.04,167.649,219.354,164.963,216.04,164.963z" />
      <Path d="M216.04,118.411h-41.718c-3.313,0-6,2.687-6,6s2.687,6,6,6h41.718c3.314,0,6-2.687,6-6S219.354,118.411,216.04,118.411z" />
      <Path d="M216.04,141.686h-41.718c-3.313,0-6,2.687-6,6c0,3.314,2.687,6,6,6h41.718c3.314,0,6-2.686,6-6 C222.04,144.373,219.354,141.686,216.04,141.686z" />
      <Path d="M85.163,133.136c17.004,0,30.838-13.839,30.838-30.849c0-17.011-13.834-30.85-30.838-30.85 c-17.009,0-30.847,13.839-30.847,30.85C54.316,119.297,68.154,133.136,85.163,133.136z M85.163,86.438 c8.733,0,15.838,7.11,15.838,15.85c0,8.739-7.104,15.849-15.838,15.849c-8.738,0-15.847-7.11-15.847-15.849 C69.316,93.548,76.425,86.438,85.163,86.438z" />
      <Path d="M97.097,138.68H73.415c-16.592,0-30.09,13.497-30.09,30.088v12.961c0,4.142,3.357,7.5,7.5,7.5s7.5-3.358,7.5-7.5v-12.961 c0-8.319,6.77-15.088,15.09-15.088h23.682c8.32,0,15.09,6.768,15.09,15.088v12.961c0,4.142,3.357,7.5,7.5,7.5s7.5-3.358,7.5-7.5 v-12.961C127.187,152.177,113.688,138.68,97.097,138.68z" />
    </G>
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
  </Svg>
);

export const EmailIcon = props => (
  <Svg
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 489.776 489.776"
    style={{
      enableBackground: 'new 0 0 489.776 489.776',
    }}
    xmlSpace="preserve"
    width={PixelPerfect(20)}
    height={PixelPerfect(20)}
    fill="#9093A3"
    {...props}>
    <G>
      <Path d="M469.075,64.488h-448.2c-10.3,0-18.8,7.5-20.5,17.3c-0.6,2.4-0.3,322.7-0.3,322.7c0,11.4,9.4,20.8,20.8,20.8h447.1 c11.4,0,20.8-8.3,21.8-19.8v-320.2C489.875,73.788,480.475,64.488,469.075,64.488z M404.275,106.088l-159.8,114.4l-159.8-114.4 H404.275z M40.675,384.788v-259.9l192.4,137.2c7.8,6.3,17.2,4.4,22.9,0l192.4-137.8v260.5L40.675,384.788L40.675,384.788z" />
    </G>
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
  </Svg>
);

export const CloseIcon = props => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={PixelPerfect(22)}
    height={PixelPerfect(22)}
    fill={props.fill ? props.fill : '#9093A3'}
    {...props}>
    <Path
      d="M6.22566 4.81096C5.83514 4.42044 5.20197 4.42044 4.81145 4.81096C4.42092 5.20148 4.42092 5.83465 4.81145 6.22517L10.5862 11.9999L4.81151 17.7746C4.42098 18.1651 4.42098 18.7983 4.81151 19.1888C5.20203 19.5793 5.8352 19.5793 6.22572 19.1888L12.0004 13.4141L17.7751 19.1888C18.1656 19.5793 18.7988 19.5793 19.1893 19.1888C19.5798 18.7983 19.5798 18.1651 19.1893 17.7746L13.4146 11.9999L19.1893 6.22517C19.5799 5.83465 19.5799 5.20148 19.1893 4.81096C18.7988 4.42044 18.1657 4.42044 17.7751 4.81096L12.0004 10.5857L6.22566 4.81096Z"
      fill={props.fill ? props.fill : 'black'}
    />
  </Svg>
);

export const ShipAnchorIcon2 = props => (
  <Svg
    width="576px"
    height="576px"
    viewBox="0 -32 576 576"
    xmlns="http://www.w3.org/2000/svg"
    height={PixelPerfect(90)}
    width={PixelPerfect(90)}
    fill={'#D9D9D9'}
    {...props}>
    <Path d="M12.971 352h32.394C67.172 454.735 181.944 512 288 512c106.229 0 220.853-57.38 242.635-160h32.394c10.691 0 16.045-12.926 8.485-20.485l-67.029-67.029c-4.686-4.686-12.284-4.686-16.971 0l-67.029 67.029c-7.56 7.56-2.206 20.485 8.485 20.485h35.146c-20.29 54.317-84.963 86.588-144.117 94.015V256h52c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-52v-5.47c37.281-13.178 63.995-48.725 64-90.518C384.005 43.772 341.605.738 289.37.01 235.723-.739 192 42.525 192 96c0 41.798 26.716 77.35 64 90.53V192h-52c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h52v190.015c-58.936-7.399-123.82-39.679-144.117-94.015h35.146c10.691 0 16.045-12.926 8.485-20.485l-67.029-67.029c-4.686-4.686-12.284-4.686-16.971 0L4.485 331.515C-3.074 339.074 2.28 352 12.971 352zM288 64c17.645 0 32 14.355 32 32s-14.355 32-32 32-32-14.355-32-32 14.355-32 32-32z" />
  </Svg>
);

export const TickInCircle = (props: SVGProps) => (
  <Svg
    height={PixelPerfect(90)}
    width={PixelPerfect(90)}
    fill={props.fill ? props.fill : Colors.mainColor}
    viewBox="0 -3.5 170 170"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M142.196 30.4125C142.586 30.0637 142.897 29.6356 143.109 29.1567C143.32 28.6778 143.427 28.1592 143.422 27.6357C143.417 27.1122 143.3 26.5959 143.079 26.1213C142.858 25.6467 142.538 25.2248 142.141 24.8838C141.722 24.5249 141.307 24.1678 140.895 23.8127C137.751 21.1093 134.5 18.3102 131.1 15.9225C105.123 -2.36044 78.1316 -2.4633 50.8803 7.23287C26.2068 16.0055 10.3619 33.5563 3.77909 59.3882C-3.56415 88.249 2.86618 113.71 22.9048 135.073C23.4261 135.625 23.9582 136.177 24.4895 136.704C35.2539 147.469 48.6614 154.115 59.2847 158.739C63.8445 160.731 87.2404 163.149 93.5707 162.206C131.19 156.588 155.946 135.37 164.569 99.8725C166.215 92.9194 167.035 85.7962 167.011 78.6508C166.974 71.1466 165.712 63.6988 163.275 56.6012C163.097 56.0703 162.805 55.5851 162.418 55.1805C162.031 54.7759 161.56 54.4618 161.037 54.2606C160.515 54.0595 159.954 53.9764 159.396 54.0171C158.838 54.0579 158.295 54.2216 157.808 54.4965L157.706 54.5547C156.931 54.9984 156.336 55.7005 156.027 56.5381C155.717 57.3757 155.712 58.2954 156.012 59.1364C158.212 65.2371 159.334 71.674 159.327 78.1592C159.251 85.9394 158.198 93.6792 156.192 101.197C150.248 122.8 136.038 138.545 112.75 149.315C89.0741 160.65 55.1215 149.19 46.0879 143.226C36.1031 136.4 27.3663 127.908 20.2596 118.121C9.11418 102.34 6.61369 79.6587 12.6028 58.9229C15.4055 49.3489 20.3036 40.5185 26.9421 33.0722C33.5806 25.6259 41.793 19.7503 50.9838 15.8714C74.8941 5.93474 98.8852 4.18192 122.285 19.0635C125.422 21.061 133.422 27.3424 137.465 30.5501C138.143 31.0882 138.99 31.3691 139.855 31.3432C140.721 31.3172 141.549 30.986 142.194 30.4082L142.196 30.4125Z"
      fill={props.fill ? props.fill : Colors.mainColor}
    />
    <Path
      d="M74.6287 104.313C76.2312 102.79 77.1115 102.019 77.9173 101.177C103.753 74.1855 132.047 49.8851 160.508 25.7727C161.584 24.8619 162.685 23.7 163.958 23.3737C165.493 22.9815 167.996 23.4326 168.682 24.2661C169.133 24.8821 169.418 25.6035 169.509 26.3612C169.601 27.1189 169.496 27.8875 169.206 28.5932C168.537 30.3474 166.907 31.8498 165.429 33.1629C156.607 41.0019 147.538 48.5708 138.872 56.5716C120.756 73.3024 102.756 90.1576 84.8704 107.137C77.0334 114.561 74.0173 114.862 66.8059 106.929C62.0589 101.705 47.7328 84.0973 43.3455 78.5495C42.7256 77.6872 42.1735 76.7781 41.6941 75.8305C40.7045 74.0756 40.0576 72.1419 42.0246 70.7814C44.2158 69.2662 45.7707 70.8473 47.0696 72.4937C48.384 74.1607 49.5048 75.9916 50.9121 77.5713C55.2811 82.4737 69.908 99.1421 74.6287 104.313Z"
      fill={props.fill ? props.fill : Colors.mainColor}
    />
  </Svg>
);

export const PenIcon = props => (
  <Svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 512.008 512.008"
    style={{
      enableBackground: 'new 0 0 512.008 512.008',
    }}
    xmlSpace="preserve"
    height={PixelPerfect(20)}
    width={PixelPerfect(20)}
    fill={'#FFFFFF'}
    {...props}>
    <G>
      <G>
        <Path d="M504.507,79.905L432.102,7.499c-9.993-9.992-26.206-10.001-36.207,0L51.959,351.435c-2.807,2.807-4.924,6.238-6.187,10.01 L1.313,478.309c-3.063,9.199-0.674,19.336,6.187,26.197c6.861,6.861,16.998,9.25,26.197,6.187l116.864-44.459 c3.772-1.254,7.194-3.371,10.01-6.187l343.936-343.936C514.508,106.11,514.508,89.906,504.507,79.905z M25.608,486.398 l44.459-116.864l72.405,72.405L25.608,486.398z M160.571,423.841l-72.405-72.405L359.696,79.905l72.405,72.405L160.571,423.841z  M450.201,134.211l-72.405-72.405l36.207-36.207l72.405,72.405L450.201,134.211z" />
      </G>
    </G>
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
  </Svg>
);

// export const CalenderIcon = props => (
//   <Svg
//     height={PixelPerfect(22)}
//     width={PixelPerfect(22)}
//     fill={'#FFFFFF'}
//     viewBox="0 0 24 24"
//     xmlns="http://www.w3.org/2000/svg"
//     {...props}>
//     <Path d="M19,4H17V3a1,1,0,0,0-2,0V4H9V3A1,1,0,0,0,7,3V4H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7A3,3,0,0,0,19,4Zm1,15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V12H20Zm0-9H4V7A1,1,0,0,1,5,6H7V7A1,1,0,0,0,9,7V6h6V7a1,1,0,0,0,2,0V6h2a1,1,0,0,1,1,1Z" />
//   </Svg>
// );
export const CalenderIcon = props => (
  <Svg
    height={PixelPerfect(22)}
    width={PixelPerfect(22)}
    fill={'#FFFFFF'}
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path d="M960 95.888l-256.224.001V32.113c0-17.68-14.32-32-32-32s-32 14.32-32 32v63.76h-256v-63.76c0-17.68-14.32-32-32-32s-32 14.32-32 32v63.76H64c-35.344 0-64 28.656-64 64v800c0 35.343 28.656 64 64 64h896c35.344 0 64-28.657 64-64v-800c0-35.329-28.656-63.985-64-63.985zm0 863.985H64v-800h255.776v32.24c0 17.679 14.32 32 32 32s32-14.321 32-32v-32.224h256v32.24c0 17.68 14.32 32 32 32s32-14.32 32-32v-32.24H960v799.984zM736 511.888h64c17.664 0 32-14.336 32-32v-64c0-17.664-14.336-32-32-32h-64c-17.664 0-32 14.336-32 32v64c0 17.664 14.336 32 32 32zm0 255.984h64c17.664 0 32-14.32 32-32v-64c0-17.664-14.336-32-32-32h-64c-17.664 0-32 14.336-32 32v64c0 17.696 14.336 32 32 32zm-192-128h-64c-17.664 0-32 14.336-32 32v64c0 17.68 14.336 32 32 32h64c17.664 0 32-14.32 32-32v-64c0-17.648-14.336-32-32-32zm0-255.984h-64c-17.664 0-32 14.336-32 32v64c0 17.664 14.336 32 32 32h64c17.664 0 32-14.336 32-32v-64c0-17.68-14.336-32-32-32zm-256 0h-64c-17.664 0-32 14.336-32 32v64c0 17.664 14.336 32 32 32h64c17.664 0 32-14.336 32-32v-64c0-17.68-14.336-32-32-32zm0 255.984h-64c-17.664 0-32 14.336-32 32v64c0 17.68 14.336 32 32 32h64c17.664 0 32-14.32 32-32v-64c0-17.648-14.336-32-32-32z" />
  </Svg>
);

export const RatingStarIcon = ({size, color}: any) => (
  <Svg
    width={size ? size : '8.473'}
    height={size ? size : '8.473'}
    viewBox="0 0 8.473 8.473">
    <Path
      id="Path_12"
      data-name="Path 12"
      d="M58.237,70.811l2.618,1.662-.693-3.135,2.311-2.108-3.047-.275L58.237,64l-1.19,2.955L54,67.231l2.311,2.108-.693,3.135Z"
      transform="translate(-54 -64)"
      fill={color ? color : '#fff'}
    />
  </Svg>
);

export const ArrowDownIcon = ({fill, ...props}) => (
  <Svg
    id="icon_arrow"
    data-name="icon/arrow"
    width={12}
    height={12}
    viewBox="0 0 15 10"
    {...props}>
    <Defs>
      <ClipPath id="clip-path">
        <Path
          id="Mask"
          d="M13.238,0,7.5,5.725,1.762,0,0,1.762l7.5,7.5,7.5-7.5Z"
        />
      </ClipPath>
    </Defs>
    <G id="_Color" data-name="\uD83C\uDFA8 Color">
      <Path
        id="Mask-2"
        data-name="Mask"
        d="M13.238,0,7.5,5.725,1.762,0,0,1.762l7.5,7.5,7.5-7.5Z"
      />
      <G
        id="_Color-2"
        data-name="\uD83C\uDFA8 Color"
        clipPath="url(#clip-path)">
        <G
          id="_Color-3"
          data-name="\uD83C\uDFA8 Color"
          transform="translate(-6.25 -8.75)">
          <Rect
            id="Colors_Sec1"
            data-name="Colors/Sec1"
            width={27.5}
            height={27.5}
            fill={fill ? fill : '#d58632'}
          />
        </G>
      </G>
    </G>
  </Svg>
);

export const PlusIcon = props => (
  <Svg
    width={PixelPerfect(18)}
    height={PixelPerfect(18)}
    viewBox="0 0 48 48"
    fill="#FFFFFF"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect width={48} height={48} fill="white" fillOpacity={0.01} />
    <Path
      d="M24.0607 10L24.024 38"
      stroke="#FFFFFF"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 24L38 24"
      stroke="#FFFFFF"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const MinusIcon = props => (
  <Svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    width={PixelPerfect(18)}
    height={PixelPerfect(18)}
    fill="#9B9B9B"
    {...props}>
    <Rect x={0} fill="none" width={18} height={18} />
    <G>
      <Path d="M3 11h18v2H3z" />
    </G>
  </Svg>
);

export const MapIcon = props => (
  <Svg
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 490 490"
    style={{
      enableBackground: 'new 0 0 490 490',
    }}
    xmlSpace="preserve"
    height={PixelPerfect(20)}
    width={PixelPerfect(20)}
    fill="#FFFFFF"
    {...props}>
    <G>
      <Path d="M326.666,490L490,391.949V0.001L326.669,105.585h-0.006L178.666,10.177V8.641h-2.383l-13.403-8.64L0,82.979V490 L163.333,388.18L326.666,490z M459.375,56.264v318.349l-116.19,69.75V131.375l0.108-0.069L459.375,56.264z M310.073,131.327 l2.488,1.604v312.189l-133.026-82.927l-0.868-0.541V46.614L310.073,131.327z M30.625,434.821V101.748L148.041,41.93v319.696 l-0.908,0.566L30.625,434.821z" />
    </G>
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
  </Svg>
);

export const CloseIconInCircle = props => (
  <Svg
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 252 252"
    style={{
      enableBackground: 'new 0 0 252 252',
    }}
    xmlSpace="preserve"
    height={PixelPerfect(24)}
    width={PixelPerfect(24)}
    fill="#B4B4B4"
    {...props}>
    <G>
      <Path d="M126,0C56.523,0,0,56.523,0,126s56.523,126,126,126s126-56.523,126-126S195.477,0,126,0z M126,234 c-59.551,0-108-48.449-108-108S66.449,18,126,18s108,48.449,108,108S185.551,234,126,234z" />
      <Path d="M164.612,87.388c-3.515-3.515-9.213-3.515-12.728,0L126,113.272l-25.885-25.885c-3.515-3.515-9.213-3.515-12.728,0 c-3.515,3.515-3.515,9.213,0,12.728L113.272,126l-25.885,25.885c-3.515,3.515-3.515,9.213,0,12.728 c1.757,1.757,4.061,2.636,6.364,2.636s4.606-0.879,6.364-2.636L126,138.728l25.885,25.885c1.757,1.757,4.061,2.636,6.364,2.636 s4.606-0.879,6.364-2.636c3.515-3.515,3.515-9.213,0-12.728L138.728,126l25.885-25.885 C168.127,96.601,168.127,90.902,164.612,87.388z" />
    </G>
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
  </Svg>
);

export const ArrowLeftIcon = props => (
  <Svg
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    className="bi bi-arrow-left"
    height={PixelPerfect(20)}
    width={PixelPerfect(20)}
    fill="#C6C6C6"
    {...props}>
    <Path
      fillRule="evenodd"
      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
    />
  </Svg>
);

export const MessageIcon = props => (
  <Svg
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    height={PixelPerfect(24)}
    width={PixelPerfect(24)}
    {...props}>
    <Defs></Defs>
    <Path
      className="cls-1"
      d="M448,76.56A38.44,38.44,0,0,1,486.4,115v230.4a38.44,38.44,0,0,1-38.4,38.4H66.2l-7.5,7.5-33.1,33.1V115A38.44,38.44,0,0,1,64,76.56H448M448,51H64A64,64,0,0,0,0,115V443.21A17.78,17.78,0,0,0,17.92,461a17.42,17.42,0,0,0,12.45-5.25L76.8,409.36H448a64,64,0,0,0,64-64V115a64,64,0,0,0-64-64Z"
    />
    <Path
      className="cls-1"
      d="M332.8,191.76H179.2a12.8,12.8,0,0,1,0-25.6H332.8a12.8,12.8,0,1,1,0,25.6Z"
    />
    <Path
      className="cls-1"
      d="M332.8,243H179.2a12.8,12.8,0,1,1,0-25.6H332.8a12.8,12.8,0,1,1,0,25.6Z"
    />
    <Path
      className="cls-1"
      d="M332.8,294.16H179.2a12.8,12.8,0,1,1,0-25.6H332.8a12.8,12.8,0,0,1,0,25.6Z"
    />
  </Svg>
);
// export const MessageIcon = props => (
//   <Svg
//     width={PixelPerfect(24)}
//     height={PixelPerfect(24)}
//     viewBox="0 0 24 24"
//     xmlns="http://www.w3.org/2000/svg"
//     fill={Colors.white}
//     {...props}>
//     <Path d="M20 2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h3v3.767L13.277 18H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14h-7.277L9 18.233V16H4V4h16v12z" />
//   </Svg>
// );

export const MapMarkerIcon = props => (
  <Svg
    width={PixelPerfect(24)}
    height={PixelPerfect(24)}
    fill={'#9093A3'}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}>
    <G id="icomoon-ignore" />
    <Path
      d="M16.001 1.072c5.291 0 9.596 4.305 9.596 9.597 0 1.683-0.446 3.341-1.29 4.799l-8.307 14.394-8.308-14.395c-0.843-1.456-1.289-3.115-1.289-4.798 0-5.292 4.305-9.597 9.597-9.597zM16.001 14.4c2.058 0 3.731-1.674 3.731-3.731s-1.674-3.731-3.731-3.731c-2.058 0-3.732 1.674-3.732 3.731s1.674 3.731 3.732 3.731zM16.001 0.006c-5.889 0-10.663 4.775-10.663 10.663 0 1.945 0.523 3.762 1.432 5.332l9.23 15.994 9.23-15.994c0.909-1.57 1.432-3.387 1.432-5.332 0-5.888-4.774-10.663-10.662-10.663v0zM16.001 13.334c-1.472 0-2.666-1.193-2.666-2.665 0-1.471 1.194-2.665 2.666-2.665s2.665 1.194 2.665 2.665c0 1.472-1.193 2.665-2.665 2.665v0z"
      fill={props.fill ? props.fill : '#9093A3'}
    />
  </Svg>
);

export const CameraIcon = props => (
  <Svg
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 490 490"
    style={{
      enableBackground: 'new 0 0 490 490',
    }}
    xmlSpace="preserve"
    width={PixelPerfect(24)}
    height={PixelPerfect(24)}
    fill={'#9093A3'}
    {...props}>
    <G>
      <G>
        <Path d="M0,167.85v216.2c0,33,26.8,59.8,59.8,59.8h370.4c33,0,59.8-26.8,59.8-59.8v-216.2c0-31.4-25.5-56.9-56.9-56.9h-79.6 l-1.9-8.3c-7.7-33.3-37-56.5-71.2-56.5h-70.9c-34.1,0-63.4,23.2-71.2,56.5l-1.9,8.3H56.9C25.5,110.95,0,136.55,0,167.85z  M146.2,135.45c5.7,0,10.6-3.9,11.9-9.5l4.1-17.8c5.2-22.1,24.6-37.5,47.3-37.5h70.9c22.7,0,42.1,15.4,47.3,37.5l4.1,17.8 c1.3,5.5,6.2,9.5,11.9,9.5H433c17.9,0,32.4,14.5,32.4,32.4v216.2c0,19.5-15.8,35.3-35.3,35.3H59.8c-19.5,0-35.3-15.8-35.3-35.3 v-216.2c0-17.9,14.5-32.4,32.4-32.4H146.2z" />
        <Circle cx={82.9} cy={187.75} r={16.4} />
        <Path d="M245,380.95c56.7,0,102.9-46.2,102.9-102.9s-46.2-102.9-102.9-102.9s-102.9,46.1-102.9,102.9S188.3,380.95,245,380.95z  M245,199.65c43.2,0,78.4,35.2,78.4,78.4s-35.2,78.4-78.4,78.4s-78.4-35.2-78.4-78.4S201.8,199.65,245,199.65z" />
      </G>
    </G>
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
  </Svg>
);

export const ShipAnchorIcon = props => (
  <Svg
    width={PixelPerfect(30)}
    height={PixelPerfect(30)}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    fill="#B4B4B4"
    {...props}>
    <Path d="M 16 4 C 13.800781 4 12 5.800781 12 8 C 12 9.851563 13.28125 11.398438 15 11.84375 L 15 14 L 12 14 L 12 16 L 15 16 L 15 23.96875 C 12.574219 23.777344 10.960938 22.890625 9.8125 21.875 C 8.9375 21.101563 8.351563 20.25 7.9375 19.53125 L 9.53125 18.75 L 5.53125 16.9375 L 4.46875 21.25 L 6.125 20.4375 C 6.597656 21.285156 7.332031 22.371094 8.46875 23.375 C 9.921875 24.664063 12.066406 25.730469 15 25.9375 L 15 26 L 16 27 L 17 26 L 17 25.9375 C 19.933594 25.730469 22.078125 24.664063 23.53125 23.375 C 24.667969 22.371094 25.402344 21.285156 25.875 20.4375 L 27.53125 21.25 L 26.46875 16.9375 L 22.46875 18.75 L 24.0625 19.53125 C 23.648438 20.25 23.0625 21.101563 22.1875 21.875 C 21.039063 22.890625 19.425781 23.777344 17 23.96875 L 17 16 L 20 16 L 20 14 L 17 14 L 17 11.84375 C 18.71875 11.398438 20 9.851563 20 8 C 20 5.800781 18.199219 4 16 4 Z M 16 6 C 17.117188 6 18 6.882813 18 8 C 18 9.117188 17.117188 10 16 10 C 14.882813 10 14 9.117188 14 8 C 14 6.882813 14.882813 6 16 6 Z" />
  </Svg>
);

export const HeartIcon = (props?: SvgProps) => (
  <Svg
    width={PixelPerfect(24)}
    height={PixelPerfect(24)}
    viewBox="0 0 32 32"
    {...props}>
    <Path d="M 9.5 5 C 5.363281 5 2 8.402344 2 12.5 C 2 13.929688 2.648438 15.167969 3.25 16.0625 C 3.851563 16.957031 4.46875 17.53125 4.46875 17.53125 L 15.28125 28.375 L 16 29.09375 L 16.71875 28.375 L 27.53125 17.53125 C 27.53125 17.53125 30 15.355469 30 12.5 C 30 8.402344 26.636719 5 22.5 5 C 19.066406 5 16.855469 7.066406 16 7.9375 C 15.144531 7.066406 12.933594 5 9.5 5 Z M 9.5 7 C 12.488281 7 15.25 9.90625 15.25 9.90625 L 16 10.75 L 16.75 9.90625 C 16.75 9.90625 19.511719 7 22.5 7 C 25.542969 7 28 9.496094 28 12.5 C 28 14.042969 26.125 16.125 26.125 16.125 L 16 26.25 L 5.875 16.125 C 5.875 16.125 5.390625 15.660156 4.90625 14.9375 C 4.421875 14.214844 4 13.273438 4 12.5 C 4 9.496094 6.457031 7 9.5 7 Z" />
  </Svg>
);

export const RedHeart = (props: SvgProps) => (
  <Svg
    id="Capa_1"
    x="0px"
    y="0px"
    width={PixelPerfect(22)}
    height={PixelPerfect(22)}
    fill="#F5596C"
    viewBox="0 0 343.422 343.422"
    {...props}>
    <G>
      <G id="Artwork_15_">
        <G id="Layer_5_15_">
          <Path d="M254.791,33.251c-46.555,0-76.089,51.899-83.079,51.899c-6.111,0-34.438-51.899-83.082-51.899 c-47.314,0-85.947,39.021-88.476,86.27c-1.426,26.691,7.177,47.001,19.304,65.402c24.222,36.76,130.137,125.248,152.409,125.248 c22.753,0,127.713-88.17,152.095-125.247c12.154-18.483,20.731-38.711,19.304-65.402 C340.738,72.272,302.107,33.251,254.791,33.251" />
        </G>
      </G>
    </G>
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
  </Svg>
);

export const StarIcon = (props: SvgProps) => (
  <Svg
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 243.317 243.317"
    height={PixelPerfect(24)}
    width={PixelPerfect(24)}
    fill={Colors.white}
    xmlSpace="preserve"
    {...props}>
    <Path d="M242.949,93.714c-0.882-2.715-3.229-4.694-6.054-5.104l-74.98-10.9l-33.53-67.941c-1.264-2.56-3.871-4.181-6.725-4.181 c-2.855,0-5.462,1.621-6.726,4.181L81.404,77.71L6.422,88.61C3.596,89.021,1.249,91,0.367,93.714 c-0.882,2.715-0.147,5.695,1.898,7.688l54.257,52.886L43.715,228.96c-0.482,2.814,0.674,5.658,2.983,7.335 c2.309,1.678,5.371,1.9,7.898,0.571l67.064-35.254l67.063,35.254c1.097,0.577,2.296,0.861,3.489,0.861c0.007,0,0.014,0,0.021,0 c0,0,0,0,0.001,0c4.142,0,7.5-3.358,7.5-7.5c0-0.629-0.078-1.24-0.223-1.824l-12.713-74.117l54.254-52.885 C243.096,99.41,243.832,96.429,242.949,93.714z M173.504,146.299c-1.768,1.723-2.575,4.206-2.157,6.639l10.906,63.581 l-57.102-30.018c-2.185-1.149-4.795-1.149-6.979,0l-57.103,30.018l10.906-63.581c0.418-2.433-0.389-4.915-2.157-6.639 l-46.199-45.031l63.847-9.281c2.443-0.355,4.555-1.889,5.647-4.103l28.55-57.849l28.55,57.849c1.092,2.213,3.204,3.748,5.646,4.103 l63.844,9.281L173.504,146.299z" />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
  </Svg>
);

export const SearchIcon = (props?: SvgProps) => (
  <Svg
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 488.4 488.4"
    xmlSpace="preserve"
    width={PixelPerfect(20)}
    height={PixelPerfect(20)}
    {...props}>
    <G>
      <G>
        <Path d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6 s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2 S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7 S381.9,104.65,381.9,203.25z" />
      </G>
    </G>
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
  </Svg>
);

export const FilterIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={PixelPerfect(18)}
    height={PixelPerfect(18)}
    viewBox="0 0 512.000000 512.000000"
    preserveAspectRatio="xMidYMid meet"
    fill={Colors.mainColor}
    {...props}>
    <G
      transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
      fill={Colors.mainColor}
      stroke="none">
      <Path d="M245 5111 c-90 -22 -172 -90 -215 -176 -25 -49 -25 -55 -28 -341 -3 -238 0 -303 13 -358 20 -87 73 -188 127 -245 24 -24 417 -376 873 -782 457 -406 840 -753 852 -772 55 -88 53 -33 53 -1248 l0 -1121 34 -34 c61 -61 48 -67 607 267 527 316 564 342 610 435 l24 49 5 780 5 780 23 47 c13 25 38 62 55 82 18 19 403 364 856 766 453 402 839 750 858 773 48 57 90 145 109 224 12 54 15 122 12 357 l-3 291 -34 63 c-38 70 -69 100 -145 140 l-51 27 -2305 2 c-1268 0 -2318 -2 -2335 -6z m4600 -217 c63 -29 67 -52 63 -347 -4 -284 -9 -312 -64 -385 -15 -19 -410 -375 -878 -791 -468 -417 -861 -771 -872 -787 -33 -46 -70 -123 -88 -183 -14 -48 -16 -144 -16 -798 0 -615 -2 -749 -14 -777 -12 -30 -64 -64 -424 -280 -226 -135 -413 -246 -416 -246 -3 0 -7 469 -8 1042 l-3 1043 -23 56 c-56 138 -50 133 -951 933 -467 416 -861 771 -875 789 -55 72 -60 101 -64 384 -3 227 -1 266 13 297 34 71 -167 66 2333 66 2032 0 2257 -2 2287 -16z" />
    </G>
  </Svg>
);

export const RefreshIcon = (props: SvgProps) => (
  <Svg
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 490.563 490.563"
    height={PixelPerfect(18)}
    width={PixelPerfect(18)}
    xmlSpace="preserve"
    fill={'#9B9B9B'}
    {...props}>
    <G>
      <Path d="M331.004,128.766c-2.1,11.4,5.2,21.8,16.6,23.9l102,17.7c12.1,1.9,20.1-6.6,22.9-17.7l17.7-102 c2.1-11.4-5.2-21.8-16.6-23.9s-21.8,5.2-23.9,16.6l-9,54.7c-45.7-60.7-117.9-97.8-195.8-97.9c-146.7,0-243.9,116.3-244.9,244.9 c-0.5,65.4,49.8,232.9,244.8,244.8c195.2,11.9,244.8-179.4,244.8-244.8c0-11.3-9.2-20.5-20.5-20.5s-20.5,9.2-20.5,20.5 c0,112.4-91.4,203.8-203.8,203.8s-203.8-91.4-203.8-203.8s91.4-203.8,203.8-203.8c63.9,0,123.3,30.1,161.4,79.3l-51.2-8.5 C343.504,109.966,333.104,117.266,331.004,128.766z" />
    </G>
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
  </Svg>
);

export const ChevronUp = props => (
  <Svg
    fill={'#899CA9'}
    width="16px"
    height="16px"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.024 5.928l-4.357 4.357-.62-.618L7.716 5h.618L13 9.667l-.619.618-4.357-4.357z"
    />
  </Svg>
);

export const ChevronDown = props => (
  <Svg
    fill={'#899CA9'}
    height={PixelPerfect(10)}
    width={PixelPerfect(10)}
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 407.437 407.437"
    style={{
      enableBackground: 'new 0 0 407.437 407.437',
    }}
    xmlSpace="preserve"
    {...props}>
    <Polygon points="386.258,91.567 203.718,273.512 21.179,91.567 0,112.815 203.718,315.87 407.437,112.815 " />
  </Svg>
);

export const CurvedArrow = props => (
  <Svg
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    fill={Colors.white}
    height={PixelPerfect(20)}
    width={PixelPerfect(20)}
    viewBox="0 0 869.958 869.958"
    style={{
      enableBackground: 'new 0 0 869.958 869.958',
    }}
    xmlSpace="preserve"
    {...props}>
    <G>
      <Path d="M115.132,737.958c13.436,0,26.872-5.126,37.124-15.377c20.502-20.502,20.502-53.744-0.001-74.246 c-30.474-30.474-47.256-70.988-47.256-114.084v-4.32c0-88.963,72.377-161.34,161.34-161.34h423.78l-41.688,42.192 c-20.381,20.625-20.18,53.865,0.445,74.244c10.23,10.11,23.564,15.155,36.896,15.155c13.541,0,27.078-5.207,37.346-15.6 l131.684-133.271c9.787-9.905,15.236-23.291,15.154-37.215c-0.084-13.923-5.693-27.244-15.6-37.03l-131.48-129.912 c-20.623-20.379-53.865-20.18-74.244,0.445s-20.18,53.866,0.445,74.245l42.25,41.747H266.339 c-71.143,0-138.026,27.704-188.332,78.009C27.704,391.903,0,458.788,0,529.93v4.32c0,71.143,27.704,138.026,78.01,188.331 C88.261,732.833,101.697,737.958,115.132,737.958z" />
    </G>
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
  </Svg>
);

// export const RefreshIcon = props => (
//   <Svg
//     id="Layer_1"
//     xmlns="http://www.w3.org/2000/svg"
//     xmlnsXlink="http://www.w3.org/1999/xlink"
//     x="0px"
//     y="0px"
//     viewBox="0 0 512 512"
//     style={{
//       enableBackground: 'new 0 0 512 512',
//     }}
//     xmlSpace="preserve"
//     height={PixelPerfect(15)}
//     width={PixelPerfect(15)}
//     fill="#9093A3"
//     {...props}>
//     <G>
//       <G>
//         <Path d="M511.957,185.214L512,15.045l-67.587,67.587l-7.574-7.574c-48.332-48.332-112.593-74.95-180.946-74.95 C114.792,0.107,0,114.901,0,256s114.792,255.893,255.893,255.893S511.785,397.099,511.785,256h-49.528 c0,113.79-92.575,206.365-206.365,206.365S49.528,369.79,49.528,256S142.103,49.635,255.893,49.635 c55.124,0,106.947,21.467,145.925,60.445l7.574,7.574l-67.58,67.58L511.957,185.214z" />
//       </G>
//     </G>
//     <G />
//     <G />
//     <G />
//     <G />
//     <G />
//     <G />
//     <G />
//     <G />
//     <G />
//     <G />
//     <G />
//     <G />
//     <G />
//     <G />
//     <G />
//   </Svg>
// );

export const TickMarkIcon = () => (
  <Svg width="54.551" height="39.694" viewBox="0 0 54.551 39.694">
    <Path
      id="Path_19"
      data-name="Path 19"
      d="M52.953,60.385,24.175,89.161a5.461,5.461,0,0,1-7.721,0L1.6,74.3a5.459,5.459,0,0,1,7.72-7.721l11,11L45.231,52.664a5.46,5.46,0,0,1,7.721,7.721Z"
      transform="translate(0 -51.065)"
      fill="#fff"
    />
  </Svg>
);

export const InputEyeIcon = React.memo((props: SvgProps) => (
  <Svg width={18.36} height={12.5} {...props}>
    <Path
      data-name="remove_red_eye - material"
      d="M9.18 12.5a9.806 9.806 0 0 1-7.09-2.99A9.72 9.72 0 0 1 0 6.26a9.855 9.855 0 0 1 18.36 0 9.719 9.719 0 0 1-2.09 3.25 9.806 9.806 0 0 1-7.09 2.99Zm0-10.42a4.116 4.116 0 0 0-2.1.56 4.174 4.174 0 0 0-1.52 1.52 4.219 4.219 0 0 0 0 4.2 4.174 4.174 0 0 0 1.52 1.52 4.218 4.218 0 0 0 4.2 0 4.174 4.174 0 0 0 1.52-1.52 4.219 4.219 0 0 0 0-4.2 4.174 4.174 0 0 0-1.52-1.52 4.116 4.116 0 0 0-2.1-.56Zm0 6.68a2.435 2.435 0 0 1-1.24-.34 2.555 2.555 0 0 1-.92-.92 2.429 2.429 0 0 1 0-2.479 2.545 2.545 0 0 1 .92-.92 2.431 2.431 0 0 1 2.48 0 2.545 2.545 0 0 1 .92.92 2.429 2.429 0 0 1 0 2.479 2.555 2.555 0 0 1-.92.921 2.435 2.435 0 0 1-1.24.339Z"
      fill="#c1c1c1"
    />
  </Svg>
));
