#Rscript survival.R <input gene list split by ","> <output dir/prefix>
options(stringsAsFactors = F)
Args=commandArgs(trailingOnly = TRUE)
library(survminer)
library(survival)
library(ggsci)
library(limma)

ouput=Args[2]
Args=Args[-2]

Args=strsplit2(Args[1],split=",")
Args=unique(Args)
Args=Args[which(Args!="")]
if(length(Args)<2){
  print("Please use univariate cox proportional hazards regression analysis.")
  q()
}

clinic=read.csv("/home/cancerbi/public_html/HNCDB/app/public/HNClinic.csv")
rownames(clinic)=clinic$SampleID
dataset=cbind(c("GSE27020","GSE31056","GSE41613","TCGA"),c("PFS","PFS","OS","OS"))

i=1
n=length(Args)
exp.matrix=c()
while(i<=n){
  gene.temp=system(paste("grep ",Args[i]," /home/cancerbi/public_html/HNCDB/app/public/test.matrix.txt",sep=""),
                   intern = T)
  exp.matrix=append(exp.matrix,gene.temp)
  i=i+1
}
exp.matrix=append(system("head -n 1  /home/cancerbi/public_html/HNCDB/app/public/test.matrix.txt",
                               intern = T),
                  exp.matrix)

exp.matrix=strsplit2(exp.matrix,split="\t")

gene_not_in_the_matrix=setdiff(Args,exp.matrix[,1])

if(length(gene_not_in_the_matrix)){
  print(paste("Data of ",gene_not_in_the_matrix," not exist."))
  q()
} else {
  exp.matrix=data.frame(exp.matrix)
  rownames(exp.matrix)=exp.matrix[,1]
  colnames(exp.matrix)=exp.matrix[1,]
  exp.matrix[,1]=NULL
  exp.matrix=exp.matrix[-1,]
  exp.matrix=exp.matrix[Args,clinic$SampleID]
  i=1
  n=nrow(dataset)
  while(i<=n){
    clinic.temp=clinic[which(clinic$DatasetID==dataset[i,1]),]
    exp.matrix.temp=exp.matrix[,clinic.temp$SampleID]
    exp.matrix.temp=t(exp.matrix.temp)
    exp.matrix.temp=data.frame(exp.matrix.temp)
    j=1
    k=ncol(exp.matrix.temp)
    while(j<=k){
      exp.matrix.temp[,j]=as.numeric(exp.matrix.temp[,j])
      j=j+1
    }
    clinic.temp=cbind(clinic.temp,exp.matrix.temp)
    if(dataset[i,2]=="PFS"){
      #Surv=Surv(event=clinic.temp$recurrence=="Yes",time = clinic.temp$PFS)
      falm=as.formula(paste("Surv(event=clinic.temp$recurrence=='Yes', time = clinic.temp$PFS) ~ ",
                            paste("clinic.temp$`",Args,"`", collapse= "+",sep="")))
      cox.fit <- coxph(falm, data=clinic.temp)
      High_sample=cox.fit$linear.predictors
      Low_sample=which(High_sample<=median(High_sample))
      High_sample=which(High_sample>median(High_sample))
      clinic.temp=cbind(clinic.temp,type=NA)
      clinic.temp[Low_sample,"type"]="Low score"
      clinic.temp[High_sample,"type"]="High score"
      clinic.temp$type=ordered(clinic.temp$type,levels=c("Low score","High score"))
      pvalue=summary(coxph(Surv(clinic.temp$PFS,clinic.temp$recurrence=="Yes")~clinic.temp$type))
      ggsurvplot(survfit(Surv(clinic.temp$PFS,clinic.temp$recurrence=="Yes")~clinic.temp$type),
                 data=clinic.temp,
                 conf.int = F,pval = T,palette = c("#b40816","#0852aa"),fontsize=20,
                 title=paste(sep="","\nHR: ",round(pvalue$coefficients[2],3),
                             "\nHR pvalue: ",round(pvalue$coefficients[5],3),
                             "\nHR CI: ",round(pvalue$conf.int[3],3),"-",round(pvalue$conf.int[4],3),
                             "\nGene: ",paste(Args,collapse = "+")
                            ))
      ggsave(paste("/home/cancerbi/public_html/HNCDB/app/public/test",dataset[i,1],"_",dataset[i,2],".png",sep=""),width = 5,height = 6)
    } else {
      falm=as.formula(paste("Surv(event=clinic.temp$vital=='Dead', time = clinic.temp$OS) ~ ",
                            paste("clinic.temp$`",Args,"`", collapse= "+",sep="")))
      cox.fit <- coxph(falm, data=clinic.temp)
      High_sample=cox.fit$linear.predictors
      Low_sample=which(High_sample<=median(High_sample))
      High_sample=which(High_sample>median(High_sample))
      clinic.temp=cbind(clinic.temp,type=NA)
      clinic.temp[Low_sample,"type"]="Low score"
      clinic.temp[High_sample,"type"]="High score"
      clinic.temp$type=ordered(clinic.temp$type,levels=c("Low score","High score"))
      pvalue=summary(coxph(Surv(clinic.temp$OS,clinic.temp$vital=="Dead")~clinic.temp$type))
      ggsurvplot(survfit(Surv(clinic.temp$OS,clinic.temp$vital=="Dead")~clinic.temp$type),
                 data=clinic.temp,pval.method = T,
                 conf.int = F,pval = T,palette = c("#b40816","#0852aa"),fontsize=20,
                 title=paste(sep="","\nHR: ",round(pvalue$coefficients[2],3),
                             "\nHR pvalue: ",round(pvalue$coefficients[5],3),
                             "\nHR CI: ",round(pvalue$conf.int[3],3),"-",round(pvalue$conf.int[4],3),
                             "\nGene: ",paste(Args,collapse = "+")
                 ))
      ggsave(paste("/home/cancerbi/public_html/HNCDB/app/public/multisurvival/",output,".",dataset[i,1],"_",dataset[i,2],".png",sep=""),width = 5,height = 6)
    }
    i=i+1
  }
}
print("Analysis done!")

