import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, X, Lock } from 'lucide-react';

export default function FileUpload() {
    const [upload, setUpload] = useState(null);
    const [error, setError] = useState("");
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "application/pdf") {
            setUpload(file);
            setError("");
        } else {
            setError("Please upload a PDF file");
        }
    };

    const removeSelectedFile = () => setUpload(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!upload) return;
        
        const formData = new FormData();
        formData.append('resume', upload);
        try {
            const res = await fetch("http://localhost:8080/user/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            console.log(data);
            // navigate('/dashboard'); // Example next step
        } catch (err) {
            setError("Upload failed. Please try again.");
            console.error(err.message);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.glassCard}>
                {!upload ? (
                    <div style={styles.dropZone}>
                        <p style={styles.instructionText}>Drop your resume here or choose a file.</p>
                        <p style={styles.subText}>PDF only. Max 2MB file size.</p>
                        
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            style={{ display: 'none' }} 
                            accept=".pdf" 
                            onChange={handleChange} 
                        />
                        
                        <button 
                            style={styles.uploadBtn} 
                            onClick={() => fileInputRef.current.click()}
                        >
                            <Upload size={20} style={{ marginRight: '8px' }} />
                            Upload Your Resume
                        </button>

                        <div style={styles.privacyTag}>
                            <Lock size={14} style={{ marginRight: '5px' }} />
                            Privacy guaranteed
                        </div>
                    </div>
                ) : (
                    <div style={styles.selectedFileContainer}>
                        <div style={styles.fileInfo}>
                            <FileText color="#10b981" />
                            <span style={styles.fileName}>{upload.name}</span>
                            <X 
                                size={18} 
                                style={{ cursor: 'pointer', color: '#94a3b8' }} 
                                onClick={removeSelectedFile} 
                            />
                        </div>
                        <button style={styles.submitBtn} onClick={handleSubmit}>
                            Analyze Resume
                        </button>
                    </div>
                )}
                {error && <p style={styles.errorText}>{error}</p>}
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        padding: '20px',
    },
    glassCard: {
        width: '100%',
        maxWidth: '600px',
        padding: '40px',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: '24px',
        border: '1px dashed rgba(255, 255, 255, 0.2)',
        textAlign: 'center',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    },
    instructionText: {
        color: '#e2e8f0',
        fontSize: '18px',
        fontWeight: '500',
        marginBottom: '4px',
    },
    subText: {
        color: '#94a3b8',
        fontSize: '14px',
        marginBottom: '24px',
    },
    uploadBtn: {
        backgroundColor: '#10b981',
        color: '#fff',
        padding: '12px 28px',
        borderRadius: '8px',
        border: 'none',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        transition: 'transform 0.2s ease',
    },
    privacyTag: {
        marginTop: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#64748b',
        fontSize: '13px',
    },
    selectedFileContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px',
    },
    fileInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: 'rgba(0,0,0,0.2)',
        padding: '10px 20px',
        borderRadius: '12px',
        width: '100%',
    },
    fileName: {
        color: '#fff',
        flex: 1,
        textAlign: 'left',
        fontSize: '14px',
    },
    submitBtn: {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #10b981',
        background: 'transparent',
        color: '#10b981',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    },
    errorText: {
        color: '#ef4444',
        marginTop: '15px',
        fontSize: '14px',
    }
};