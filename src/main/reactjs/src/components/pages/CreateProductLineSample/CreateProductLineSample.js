import React, {useState} from 'react'
import styles from './CreateProductLineSample.module.css'

export default function CreateProductLineSample() {
  const [audioAndSpeaker, setAudioAndSpeaker] = useState("")
  const [battery, setBattery] = useState("")
  const [camera, setCamera] = useState("")
  const [display, setDisplay] = useState("")
  const [hardDrive, setHardDrive] = useState("")
  const [memory, setMemory] = useState("")
  const [operatingSystem, setOperatingSystem] = useState("");
  const [processor, setProcessor] = useState("")
  const [productName, setProductName] = useState("");
  const [videoCard, setVideoCard] = useState("");
  const [wireless, setWireless] = useState("");

  return (
    <div className="CreateAcount">
      <h2 className="title">Tạo dòng sản phẩm</h2>
      <form className={styles.form} action="" method="post">
        <div className="audio_and_speaker">
          <div className={styles.action}>
            <label htmlFor="audio_and_speaker">Audio and speaker</label>
            <input
              type="text"
              name="audio_and_speaker"
              id="audio_and_speaker"
              placeholder="Audio and Speaker"
              value={audioAndSpeaker}
              onChange={(e) => setAudioAndSpeaker(e.target.value)}
            />
          </div>
          <div className="alert">
          </div>
        </div>
        <div className="battery">
          <div className={styles.action}>
            <label htmlFor="battery">Battery</label>
            <input
              type="text"
              name="battery"
              id="battery"
              placeholder="Battery"
              value={battery}
              onChange={(e) => setBattery(e.target.value)}
            />
          </div>
          <div className="alert">
          </div>
        </div>
        <div className="camera">
          <div className={styles.action}>
            <label htmlFor="camera">Camera</label>
            <input
              type="text"
              name="camera"
              id="camera"
              placeholder="Camera"
              value={camera}
              onChange={(e) => setCamera(e.target.value)}
            />
          </div>
          <div className="alert">
          </div>
        </div>
        <div className="display">
          <div className={styles.action}>
            <label htmlFor="display">Display</label>
            <input
              type="text"
              name="display"
              id="display"
              placeholder="Display"
              value={display}
              onChange={(e) => setDisplay(e.target.value)}
            />
          </div>
          <div className="alert">
          </div>
        </div>
        <div className="hardDrive">
          <div className={styles.action}>
            <label htmlFor="hardDrive">Hard Drive</label>
            <input
              type="text"
              name="hardDrive"
              id="hardDrive"
              placeholder="Hard Drive"
              value={hardDrive}
              onChange={(e) => setHardDrive(e.target.value)}
            />
          </div>
          <div className="alert">
          </div>
        </div>
        <div className="memory">
          <div className={styles.action}>
            <label htmlFor="memory">Memory</label>
            <input
              type="text"
              name="memory"
              id="memory"
              placeholder="Memory"
              value={memory}
              onChange={(e) => setMemory(e.target.value)}
            />
          </div>
          <div className="alert">
          </div>
        </div>
        <div className="wireless">
          <div className={styles.action}>
            <label htmlFor="wireless">Wireless</label>
            <input
              type="text"
              name="wireless"
              id="wireless"
              placeholder="Wireless"
              value={wireless}
              onChange={(e) => setWireless(e.target.value)}
            />
          </div>
          <div className="alert">
          </div>
        </div>
        <div className="processor">
          <div className={styles.action}>
            <label htmlFor="processor">Processor</label>
            <input
              type="text"
              name="processor"
              id="processor"
              placeholder="Processor"
              value={processor}
              onChange={(e) => setProcessor(e.target.value)}
            />
          </div>
          <div className="alert">
          </div>
        </div>
        <div className="product_name">
          <div className={styles.action}>
            <label htmlFor="product_name">Product Name</label>
            <input
              type="text"
              name="product_name"
              id="product_name"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="alert">
          </div>
        </div>
        <div className="video_card">
          <div className={styles.action}>
            <label htmlFor="video_card">Video Card</label>
            <input
              type="text"
              name="video_card"
              id="video_card"
              placeholder="Video Card"
              value={videoCard}
              onChange={(e) => setVideoCard(e.target.value)}
            />
          </div>
          <div className="alert">
          </div>
        </div>
        <div className="operating_system">
          <div className={styles.action}>
            <label htmlFor="operating_system">Operating System</label>
            <input
              type="text"
              name="operating_system"
              id="operating_system"
              placeholder="Operating System"
              value={operatingSystem}
              onChange={(e) => setOperatingSystem(e.target.value)}
            />
          </div>
          <div className="alert">
          </div>
        </div>
        <div className={styles.submit}>
          <div className={styles.action}>
            <button type="submit">Tạo dòng sản phẩm</button>
          </div>
          <div className="alert">
          </div>
        </div>
      </form>
    </div>          
  )
}