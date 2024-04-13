import React from 'react'
import { useState } from 'react'
//import { Link } from 'react-router-dom'
import axios from 'axios'
import { FileText } from 'lucide-react'
import styles from './Homepage.module.css'

const Homepage = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [fileSelected, setFileSelected] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0])
      setFileSelected(true)
    }
  }

  const handleFileUpload = async () => {
    if (selectedFile) {
      try {
        const formData = new FormData()
        formData.append('file', selectedFile)
        const response = await axios.post('/api/upload', formData)
        console.log(response.data)
      } catch (error) {
        console.error('Error uploading file:', error)
      }
    }
  }

  const handleChooseAnotherFile = () => {
    setSelectedFile(null)
    setFileSelected(false)
  }

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Upload your Signature</h2>
        <p className={styles.subtitle}>
          Supported file types: DOC, DOCX, PDF, TXT
        </p>
        <div className="relative">
          <input
            type="file"
            id="fileUpload"
            className={styles.fileInput}
            accept=".doc,.docx,.pdf,.txt"
            onChange={handleFileChange}
            disabled={uploading}
          />
          <label htmlFor="fileUpload" className={styles.fileInputLabel}>
            {fileSelected ? (
              <div className={styles.selectedFile}>
                <FileText
                  className={styles.selectedFileIcon}
                  color="blue"
                  size="35px"
                />
                <p className="text-gray-600 ml-2">{selectedFile.name}</p>
              </div>
            ) : (
              <div className="text-gray-400">
                <FileText color="blue" size="35px" />
                <p className="text-sm mt-2">Click here to select file</p>
              </div>
            )}
          </label>
        </div>
        {fileSelected && (
          <div className={styles.fileActions}>
            <button
              className={styles.uploadButton}
              onClick={handleFileUpload}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
            <button
              className={styles.chooseAnotherButton}
              onClick={handleChooseAnotherFile}
              disabled={uploading}
            >
              Choose another file
            </button>
          </div>
        )}
      </div>
    </main>
  )
}

export default Homepage
