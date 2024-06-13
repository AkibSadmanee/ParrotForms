import whisper
import os

if __name__ == "__main__":
    model = whisper.load_model("small")
    _, _, files = next(os.walk("data/audio_data"))
    for fname in files:
        if fname.endswith(".mp3"):            
            result = model.transcribe(f"data/audio_data/{fname}", fp16=False)
            
            with open(f"transcription/{fname}.txt", "w") as f:
                f.write(result["text"])