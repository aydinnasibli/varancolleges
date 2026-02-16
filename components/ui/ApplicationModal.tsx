import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface ApplicationModalProps {
  children?: React.ReactNode;
}

export function ApplicationModal({ children }: ApplicationModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || <Button variant="accent">Müraciət et</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-background-dark border-white/10 text-slate-300">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-white">Müraciət et</DialogTitle>
          <DialogDescription className="text-slate-400">
            Təhsiliniz üçün ilk addımı atın. Məlumatlarınızı daxil edin, sizinlə əlaqə saxlayaq.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-slate-300">Ad və Soyad</Label>
            <Input id="name" placeholder="Adınız Soyadınız" className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-accent" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone" className="text-slate-300">Əlaqə Nömrəsi</Label>
            <Input id="phone" placeholder="+994 50 123 45 67" className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-accent" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="service" className="text-slate-300">Maraqlandığınız Xidmət</Label>
            <Select>
              <SelectTrigger className="bg-white/5 border-white/10 text-white focus:ring-accent w-full">
                <SelectValue placeholder="Xidmət seçin" />
              </SelectTrigger>
              <SelectContent className="bg-background-dark border-white/10 text-slate-300">
                <SelectItem value="sat">SAT Hazırlığı</SelectItem>
                <SelectItem value="ielts">IELTS Hazırlığı</SelectItem>
                <SelectItem value="toefl">TOEFL Hazırlığı</SelectItem>
                <SelectItem value="general-english">General English</SelectItem>
                <SelectItem value="yos">TR YÖS Hazırlığı</SelectItem>
                <SelectItem value="study-abroad">Xaricdə Təhsil Konsultasiyası</SelectItem>
                <SelectItem value="other">Digər</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message" className="text-slate-300">Əlavə Qeydlər (İstəyə bağlı)</Label>
            <Textarea id="message" placeholder="Sizi maraqlandıran suallar..." className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-accent min-h-[100px]" />
          </div>
        </div>
        <div className="flex justify-end">
          <Button variant="accent" type="submit" className="w-full sm:w-auto">Göndər</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
